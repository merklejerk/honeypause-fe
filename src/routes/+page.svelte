<script lang="ts">
    import type { Hex } from 'viem'; 
    import { PUBLIC_HONEY_ADDRESS } from '$env/static/public';
    import type { Bounty } from '$lib/types';
    import { onMount } from 'svelte';
    import { getBounties } from '$lib/query';
    import { formatBountyAmount, toEtherscanAddressUrl, toEtherscanTxUrl, trimHex } from '$lib/utils';

    let bounties = [] as Bounty[];

    onMount(async () => {
       bounties = [...bounties, ...(await getBounties())];
    });


</script>

<style lang="scss">
    :root {
        --inset-border-down: grey white white grey;
        --border-colors-up: white grey black white;
    }
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
        width: 100%;
        
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
                flex-direction: row;
                gap: 0 1.5ex; 
                width: 100%;
    
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
                        right: 0;
                        bottom: 0;
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

    .hr {
        width: 100%;
        border-style: inset;
        border: 2px solid;
        border-color: var(--inset-border-down);
    }
</style>

<div class="top">
    <img src="banner.png" class="banner" />
    <h1 class="title">Welcome to HoneyPause!</h1>
    <p class="intro">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Fusce ut placerat orci nulla. Arcu non odio euismod lacinia at quis risus. Massa vitae tortor condimentum lacinia quis vel eros donec ac. Sapien pellentesque habitant morbi tristique senectus et netus. Tellus elementum sagittis vitae et leo. Proin fermentum leo vel orci porta. Gravida cum sociis natoque penatibus et magnis dis parturient.
    </p>
    <div class="links">
        <a href="https://github.com/merklejerk/honeypause">Github</a> |
        <a href={toEtherscanAddressUrl(PUBLIC_HONEY_ADDRESS)}>Contract</a> |
        <a href="https://twitter.com/_SEAL_Org">Guestbook</a>
    </div>
</div>
<hr /> 
<div class="content-header">
    <div class="title">
        Available bounties
    </div>
</div>
<div class="bounties">
    <div>
        {#each bounties as bty}
            <div class="bounty-card">
                <div class="left">
                    {#if bty.image}
                        <div class="logo" style:background-image={`url(${bty.image})`} />
                    {/if}
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
                            <div class="text">CLAIMED</div>
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>