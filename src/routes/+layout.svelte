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

    }
    :global(hr) {
        border-style: inset;
        border-width: 1px;
        margin: 1em auto; 
        display: block;
        max-width: 95%;
        // border-top-color: grey; 
        // border-right-color: grey; 
        // border-bottom-color: grey; 
        // border-left-color: grey; 
    }

</style>

<main class="container">
    <slot />
</main>