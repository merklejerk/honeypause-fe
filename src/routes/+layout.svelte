<script lang="ts">
    import '@picocss/pico';
</script>

<style lang="scss">
    @use "@picocss/pico/scss/pico.scss" with (
        $theme-color: 'grey',
    );
    :global(:root) {
        --pico-background-color: #c0c0c0 !important;
        --pico-color: black !important;
        --pico-primary: blue !important; 
        :global(a) {
            color: blue !important;
            text-decoration: underline !important;
            font-weight: bolder; 
        }
        font-family: 'Times New Roman', Times, serif;
        font-smooth: never !important;
        -webkit-font-smoothing : none !important;
    }
    main {
        margin-bottom: 5em;
    }
    :global(hr) {
        border-style: inset !important;
        border: 1px solid !important;
        border-color: grey white white grey !important;
        margin: 1em auto; 
        max-width: 95%;
    }
</style>

<main class="container-fluid">
    <slot />
</main>