<script>
    export let image=false, title;
</script>

<hgroup style={`background-image: ${image ? `url(${image})` : 'none'}`};>
    <h1>{title}</h1>
</hgroup>

<style>
    hgroup {
        display: flex;
        align-items: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        min-height: 75vh;
    }
    hgroup > h1 {
        color: var(--white);
        font-family: var(--title-font);
        font-size: 8rem;
        text-shadow: 1px 1px 4px black;
        text-align: center;
    }
    @media (max-width: 800px) {
        hgroup > h1 {
            font-size: 4rem;
        }
    }
</style>