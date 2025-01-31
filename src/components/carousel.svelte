<script>
    export let data = [];

    import { onMount } from "svelte";

    let images = [];
    let currentImageIndex = 0;
    let interval;
    let title = data.images[0].title;

    async function loadImages() {
        currentImageIndex = Math.floor(Math.random() * images.length);

    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
    }
    function imageClick() {
        nextImage();
        clearInterval(interval);
        const newinterval = setInterval(nextImage, 4000);
        interval = newinterval;
    }

    onMount(() => {
        loadImages();
        interval = setInterval(nextImage, 4000);
        return () => clearInterval(interval);
    });

    $: images = data.images[0].image.map(item => item?.fields?.file?.url || item)
</script>

{#if images.length > 0}
    <div class="carousel">
        <h1>{title}</h1>
        <button class="carousel-button" on:click={imageClick}>
            <img src="{images[currentImageIndex]}" alt="Travel Carousel" class="carousel-image"/>
        </button>
    </div>
{/if}

<style>
    .carousel {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 800px;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .carousel-button {
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
    }

    .carousel-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
        border-radius: 10px;
        transition: opacity 0.5s ease-in-out;
    }
</style>