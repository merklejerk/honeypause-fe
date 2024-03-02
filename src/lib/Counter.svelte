<script lang="ts">
    export let value = "";

    function getDigitBackgroundPosition(idx: number, digit: string): [number, number] {
        const n = parseInt(digit, 16) % 16;
        return [(n % 4) * -20, Math.floor(n / 4) * -25];
    }
</script>

<style lang="scss">
    .component {
        display: flex;
        flex-direction: row;
        gap: 1.25px;

        .digit {
            background: url('../led-digits.png');
            background-size: 80px;
            height: 24px;
            width: 19px;
        }
    }
</style>

<div class="component">
    {#each String(value) as i, idx}
        <div
            class="digit"
            style:background-position={
                getDigitBackgroundPosition(idx, i).map(v => `${v}px`).join(' ')
            } />
    {/each}
</div>