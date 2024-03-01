import type { Hex } from "viem";

export interface Bounty {
    id: number;
    bountyTokenAddress: Hex;
    bountyTokenName: string;
    bountyTokenAmount: bigint;
    bountyTokenDecimals: number;
    image?: string;
    name?: string; 
    verifierAddress: Hex;
    claimTx?: Hex;
}
