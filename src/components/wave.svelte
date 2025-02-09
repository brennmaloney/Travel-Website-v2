<script>
    export let colour, flip = false, secondary = false;
</script>

<div class="wave-container {flip ? 'flipped' : 'normal'}" style="transform: {flip ? 'scaleY(-1)' : 'none'}">
    {#if secondary}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 145 1440 175">
            <path fill="{colour}" fill-opacity="1" d="M0,256L60,229.3C120,203,240,149,360,149.3C480,149,600,203,720,208C840,213,960,171,1080,170.7C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
            </path>
        </svg>
    {:else}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 145 1440 175">
            <path fill="{colour}" fill-opacity="1" d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,261.3C672,277,768,267,864,245.3C960,224,1056,192,1152,186.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            </path>
        </svg>
    {/if}
</div>

<style>
    .wave-container {
        position: absolute;
        width: 100%;
        left: 0;
    }
    .normal {
        bottom: -10px;
    }
    .flipped {
        top: -10px;
        transform: scaleY(-1);
    }
</style>
