<script lang="ts">
    import type { Hex } from 'viem'; 
    import { PUBLIC_HONEY_ADDRESS } from '$env/static/public';
    import type { Bounty } from '$lib/types';
    import { onMount } from 'svelte';
    import { getBounties } from '$lib/query';
    import { formatBountyAmount, toEtherscanAddressUrl, toEtherscanTxUrl, trimHex } from '$lib/utils';
    import Counter from '$lib/Counter.svelte';

    const UNKNOWN_LOGO = 'unknown.png';

    let pageCounter = Math.floor((Date.now() - new Date('2024-03-01').getTime()) / (1e3 * 30));
    let bounties = [] as Bounty[];

    onMount(async () => {
       bounties = [...bounties, ...(await getBounties())];
    });
</script>

<style lang="scss">
    @use "sass:map";
    @import "@picocss/pico/scss/pico.scss";

    :root {
        --inset-border-down: grey white white grey;
        --border-colors-up: white grey black white;
    }

    @keyframes blink { 
        0%{ 
            opacity: 0; 
        } 
        40%{ 
            opacity: 0.7; 
        } 
        100%{ 
            opacity: 0; 
        }
    }

    .top {
        margin: 1em auto 0.5em auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 800px; 

        > .logo {
            max-height: 200px;
            margin-bottom: 1em;
        }

        > .title {
            font-family: 'Times New Roman', Times, serif;
            font-weight: bold;
            text-decoration: underline;
            animation: blink 1.5s steps(1, end) infinite;
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
        width: 100%;
        margin: 1em 0;
        
        > div {
            margin: 0 auto;
            display: flex;
            flex-direction: column; 
            gap: 2.5ex;
            max-width: 480px; 

            > .bounty-card {
                border-style: inset;
                border: 2px solid;
                border-color: var(--border-colors-up);
                padding: 1em 1.5ex; 
                display: flex; 
                flex-direction: column;
                gap: 0 1.5ex; 
                width: 100%;

                @media (min-width: map.get(map.get($breakpoints, "sm"), "breakpoint")) {
                    flex-direction: row;
                }
    
                > .left {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: stretch;
                    flex: 0.5 1;
    
                    > .logo {
                        width: 8em;
                        height: 8em;
                        background-position: center;
                        background-size: cover;
                        border: 1px solid;
                        border-color: var(--inset-border-down);
                    }
                }
    
                > .right {
                    display: flex;
                    flex: 1 1;
                    flex-direction: column; 
                    position: relative;
    
                    > .name-container {
                        font-weight: bold;
                        font-size: 1.25em;
                        text-align: center;
                    }
    
                    > .details-container {
                        
                    }
    
                    > .claimed-stamp {
                        position: absolute;
                        right: -2em;
                        pointer-events: none;
    
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
        }
    }

    .footer {
        width: 100%;
        margin: 1em 0 0 0;
        display: flex;
        flex-direction: row;
        gap: 1ex;
        justify-content: center;
        align-items: end;

        > .views {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .browser-button {
            margin: 0 1ex;
            width: 116px;
            height: 42px;
            background: url('browser-buttons.jpg');
            background-size: 128px;
            border: 3px solid blue;
            
            &.netscape {
                background-position: -10px -11px;
            }
            &.ie {
                background-position: -10px -60px;
            }
        }
    }

    .hr {
        width: 100%;
        border-style: inset;
        border: 1px solid;
        border-color: var(--inset-border-down);
    }
</style>

<div class="top">
    <img src="honeypause.png" class="logo" />
    <h1 class="title">Welcome to HoneyPause.net!</h1>
    <p class="intro">
        HoneyPause lets whitehats safely and atomically <b>prove</b> a smart contract exploit <i>on-chain</i>, <b>pause</b> the affected protocol, then <b>collect</b> a bounty. Protocols can opt into the system by registering a bounty on the smart contract. The entire system is permissionless, non-custodial, and free! See the github for more info on how to participate.
    </p>
    <div class="links">
        <a href="https://github.com/merklejerk/honeypause">Github</a> |
        <a href=".">Sitemap</a> |
        <a href={toEtherscanAddressUrl(PUBLIC_HONEY_ADDRESS)}>Contract</a> |
        <a href="https://twitter.com/_SEAL_Org">Guestbook</a>
    </div>
</div>
<hr /> 
<div class="content-header">
    <div class="title">
        <img src="explosion.gif" /><img src="bounties.gif" /><img src="explosion.gif" />
    </div>
</div>
<div class="bounties">
    <div>
        {#each bounties as bty}
            <div class="bounty-card">
                <div class="left">
                    <div class="logo" style:background-image={`url(${bty.image ? encodeURIComponent(bty.image) : UNKNOWN_LOGO})`} />
                </div>
                <div class="right">
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
                            Verifier: <a href={toEtherscanAddressUrl(bty.verifierAddress)}>{trimHex(bty.verifierAddress)}</a>
                        </div>
                        {#if bty.claimTx}
                        <div>
                            Claimed @: <a href={toEtherscanTxUrl(bty.claimTx)}>{trimHex(bty.claimTx)}</a>
                        </div>
                        {/if}
                    </div>
                    {#if bty.claimTx}
                        <div class="claimed-stamp">
                            <img src="dancing_baby.gif" />
                            <div class="text">CLAIMED!</div>
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>
<hr />
<div class="footer">
    <a href="https://opera.com"><div class="browser-button netscape" /></a>
    <div class="views">
        Page views
        <Counter value={pageCounter} />
    </div>
    <a href="https://brave.com"><div class="browser-button ie" /></a>
</div>