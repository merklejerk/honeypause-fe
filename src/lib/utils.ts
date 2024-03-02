import { PUBLIC_CHAIN_ID } from "$env/static/public";
import BigNumber from "bignumber.js";
import type { Hex } from "viem";

const ETHERSCAN_PREFIX = PUBLIC_CHAIN_ID !== '1' ? 'sepolia.' : '';

export function formatBountyAmount(wei: bigint, decimals: number): string {
    let bn = new BigNumber(wei.toString()).div(new BigNumber(10).pow(decimals));
    let suffix = '';
    if (bn.gt(1e6)) {
        bn = bn.div(1e6);
        suffix = 'M';
    } else if (bn.gt(1e3)) {
        bn = bn.div(1e3);
        suffix = 'K';
    }
    return `${bn.dp(2).toString()}${suffix}`;
}

export function toEtherscanAddressUrl(addr: Hex): string {
    return `https://${ETHERSCAN_PREFIX}etherscan.io/address/${encodeURIComponent(addr)}`;
}

export function toEtherscanTxUrl(tx: Hex): string {
    return `https://${ETHERSCAN_PREFIX}etherscan.io/tx/${encodeURIComponent(tx)}`;
}

export function trimHex(hex: Hex, maxDigits: number = 8): string {
    if (hex.length <= maxDigits + 2) {
        return hex;
    }
    return `0x${hex.slice(2, 8)}..${hex.slice(-6)}`;
}