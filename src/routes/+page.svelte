<script lang="ts">
    import type { Hex } from 'viem'; 
    import BigNumber from 'bignumber.js'; 
    import { PUBLIC_CHAIN_ID } from '$env/static/public';

    interface Bounty {
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
    let bounties = [] as Bounty[];
    bounties.push(...[
        {
            id: 1,
            bountyTokenAddress: '0x1234' as Hex,
            bountyTokenName: 'USDC',
            bountyTokenAmount: 10000000n,
            bountyTokenDecimals: 6,
            name: 'PossumSwap',
            verifierAddress: '0x1234' as Hex,
            image: 'https://www.havahart.com/media/Articles/Havahart/All-About-Opossums.jpg',
        },
        {
            id: 2,
            bountyTokenAddress: '0x1234' as Hex,
            bountyTokenName: 'USDC',
            bountyTokenAmount: 330000000n,
            bountyTokenDecimals: 6,
            name: 'RaccoonSwap',
            verifierAddress: '0x1234' as Hex,
            image: 'https://www.havahart.com/media/Articles/Havahart/All-About-Opossums.jpg',
            claimTx: '0x1234' as Hex,
        },
    ]);

    const ETHERSCAN_PREFIX = PUBLIC_CHAIN_ID !== '1' ? 'sepolia.' : '';
    const CONTRACT_ADDRESS = PUBLIC_CHAIN_ID !== '1'
        ? '0x00a4748f0D0072f65aFe9bb52A723733c5878821'
        : '0x00';

    function formatBountyAmount(wei: bigint, decimals: number): string {
        return new BigNumber(wei.toString()).div(new BigNumber(10).pow(decimals)).dp(2).toString();
    }

    function toEtherscanAddressUrl(addr: Hex): string {
        return `https://${ETHERSCAN_PREFIX}etherscan.io/address/${encodeURIComponent(addr)}`;
    }

    function toEtherscanTxUrl(tx: Hex): string {
        return `https://${ETHERSCAN_PREFIX}etherscan.io/tx/${encodeURIComponent(tx)}`;
    }
</script>

<style lang="scss">
    .top {
        margin: 1em auto 0.5em auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 800px; 

        > .title {
            font-family: 'Times New Roman', Times, serif;
            font-weight: bold;
            text-decoration: underline;
        }

        > .links {
            display: flex;
            gap: 1ex;
        }
    }

    .content-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 1em;

        > .title {
            font-size: 1.33em;
            font-weight: bold;
        }
    }

    .bounties {
        display: flex;
        flex-direction: column; 
        align-items: center; 
        gap: 2.5ex;

        > .bounty-card {
            border-style: inset;
            border: 2px solid;
            border-color: white grey black white;
            padding: 1em 1.5ex; 
            display: grid; 
            gap: 1.5ex; 
            grid-template-areas: "logo-container name-container"
                                 "logo-container details-container";
            min-width: 50%;
            position: relative;

            > .logo-container {
                grid-area: logo-container;
                width: 100%;
                height: 100%;
                display: flex; 
                flex-direction: row;
                justify-content: center;
                align-items: center;
                gap: 1ex;

                > .logo {
                    width: 100%; 
                    height: 100%;
                    background-position: center;
                    background-size: cover;
                }
            }

            > .name-container {
                grid-area: name-container;
                font-weight: bold;
                font-size: 1.25em;
                text-align: center;
            }

            > .details-container {
                grid-area: details-container;
            }

            .vr {
                height: 100%;
                border-style: inset;
                border: 2px solid;
                border-color: grey white white grey;
            }

            .hr {
                width: 100%;
                border-style: inset;
                border: 2px solid;
                border-color: grey white white grey;
            }

            > .claimed-stamp {
                position: absolute;
                right: 0;
                bottom: 0;

                > img {
                    left: 0;
                }
                > .text {
                    position: absolute;
                    display: flex;
                    flex-direction: row; 
                    align-items: center;
                    justify-content: center;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    font-weight: bold;
                    font-size: 1.25em;
                    color: red;
                    transform: rotate(33deg);
                }
            }
        }
    }
</style>

<main class="container">
    <div class="top">
        <img src="banner.png" class="banner" />
        <h1 class="title">Welcome to HoneyPause!</h1>
        <p class="intro">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Fusce ut placerat orci nulla. Arcu non odio euismod lacinia at quis risus. Massa vitae tortor condimentum lacinia quis vel eros donec ac. Sapien pellentesque habitant morbi tristique senectus et netus. Tellus elementum sagittis vitae et leo. Proin fermentum leo vel orci porta. Gravida cum sociis natoque penatibus et magnis dis parturient.
        </p>
        <div class="links">
           <a href="https://github.com/merklejerk/honeypause">Github</a> |
           <a href={toEtherscanAddressUrl(CONTRACT_ADDRESS)}>Contract</a> |
           <a href={""}>Guestbook</a>
        </div>
    </div>
    <hr /> 
    <div class="content-header">
        <div class="title">
            Available bounties
        </div>
    </div>
    <div class="bounties">
        {#each bounties as bty}
            <div class="bounty-card">
                <div class="logo-container">
                    <div class="logo" style:background-image={`url(${bty.image})`} />
                    <div class="vr" />
                </div>
                <div class="name-container">
                    { bty.name }
                    <div class="hr" />
                </div>
                <div class="details-container">
                    <div>
                        ID: {bty.id}
                    </div>
                    <div>
                        Bounty: {
                            formatBountyAmount(bty.bountyTokenAmount, bty.bountyTokenDecimals)
                        }
                        <a href={toEtherscanAddressUrl(bty.bountyTokenAddress)}>
                            {bty.bountyTokenName ?? '???'}
                        </a>
                    </div>
                    <div>
                        Verifier: <a href={toEtherscanAddressUrl(bty.verifierAddress)}>{bty.verifierAddress}</a>
                    </div>
                    {#if bty.claimTx}
                    <div>
                        Claimed tx: <a href={toEtherscanTxUrl(bty.claimTx)}>{bty.claimTx}</a>
                    </div>
                    {/if}
                </div>
                {#if bty.claimTx}
                    <div class="claimed-stamp">
                        <img src="dancing_baby.gif" />
                        <div class="text">CLAIMED</div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</main>
