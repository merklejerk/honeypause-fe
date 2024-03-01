import { PUBLIC_ETHEREUM_RPC, PUBLIC_HONEY_ADDRESS, PUBLIC_START_BLOCK } from "$env/static/public";
import { createPublicClient, decodeEventLog, http, type Hex, getContract, isAddressEqual } from "viem";
import { CANCELLED_EVENT, CLAIMED_EVENT, CREATED_EVENT, ERC20_ABI } from "./abi";
import type { Bounty } from "./types";

const CLIENT = createPublicClient({ transport: http(PUBLIC_ETHEREUM_RPC), batch: { multicall: true } });
const VALID_CHARS_RE = /^[-a-z0-9 _!?]+$/i;

export async function getBounties(): Promise<Bounty[]> {
    const events = [CREATED_EVENT, CLAIMED_EVENT, CANCELLED_EVENT];
    const logs = await CLIENT.getLogs({
        fromBlock: PUBLIC_START_BLOCK ? BigInt(PUBLIC_START_BLOCK) : undefined,
        address: PUBLIC_HONEY_ADDRESS as Hex,
        events,
    });
    const bountiesById = {} as { [id: number]: Bounty };
    for (const log of logs) {
        try {
            const decoded = decodeEventLog({ abi: events, data: log.data, topics: log.topics });
            const args = decoded.args as any;
            if (decoded.eventName === 'Created') {
                const id = Number(args.bountyId);
                const { name, image } = tryParseMetadata(args.name as string);
                const amount = args.payoutAmount as bigint;
                const token = args.payoutToken as Hex;
                const verifier = args.verifier as Hex;
                bountiesById[id] = {
                    id,
                    name,
                    image,
                    bountyTokenAddress: token,
                    bountyTokenAmount: amount,
                    bountyTokenName: '???',
                    bountyTokenDecimals: 1,
                    verifierAddress: verifier,
                };
            } else if (decoded.eventName === 'Cancelled') {
                const id = Number(args.bountyId);
                delete bountiesById[id];
            } else if (decoded.eventName === 'Claimed') {
                const id = Number(args.bountyId);
                if (id in bountiesById) {
                    bountiesById[id].claimTx = log.transactionHash;
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
    const tokens = Object.keys(Object.assign(
        {},
        ...Object.values(bountiesById).map(d => ({ [d.bountyTokenAddress]: true })),
    )) as Hex[];
    const tokenData = await queryTokensData(tokens);
    const bounties = Object.values(bountiesById);
    for (let i = 0; i < bounties.length; ++i) {
        const d = tokenData[tokens.findIndex(v => isAddressEqual(bounties[i].bountyTokenAddress, v))];
        bounties[i].bountyTokenDecimals = d.decimals;
        bounties[i].bountyTokenName = d.symbol;
    }
    return Object.values(bountiesById);
}

async function queryTokensData(tokens: Hex[]): Promise<Array<{ decimals: number; symbol: string }>> {
    const erc20 = getContract({
        abi: ERC20_ABI,
        client: CLIENT,
        address: '0x',
    });
    const [symbols, decimals] = await Promise.all([
        Promise.all(tokens.map(addr =>
            (erc20.read.symbol as any)({ address: addr })
            .then((r: string) => r.slice(0, 8))
            .catch(() => '???'))) as Promise<string[]>,
        Promise.all(tokens.map(addr =>
            (erc20.read.decimals as any)({ address: addr })
            .then((r: bigint) => Number(r))
            .catch(() => 18))) as Promise<number[]>,
    ]);
    return symbols.map((symbol, i) => ({ symbol, decimals: decimals[i] }));
}

function tryParseMetadata(s: string): { name: string; image?: string; } {
    try {
        if (s.length <= 1024 && s.startsWith('{')) {
            const o = JSON.parse(s.slice(0, 1024));
            const { name, image } = o;
            if (name && typeof(name) === 'string') {
                if (image && typeof(image) === 'string') {
                    return { name, image };
                }
                return { name };
            }
        }
    } catch (err) {
        console.warn(err);
    }
    return { name: s
        .slice(0, 64)
        .split('')
        .filter(ch => VALID_CHARS_RE.test(ch))
        .join(''),
    };
}