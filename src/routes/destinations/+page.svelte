<script>
    export let data;
</script>

<div class="destinations-section">
    <h1>Destinations</h1>
    <div class="destinations-list">
        {#each data.blogs as blog}
            <div class="destination">
                <!-- <a href={`/destinations/${blog.slug}`}> -->
                    {#if blog.teaserImage}
                        <img src={blog.teaserImage.fields.file.url} alt={blog.teaserImage.fields.title} />
                    {/if}
                    <h2>{blog.title}</h2>
                    <p>{blog.teaserDescription}</p>
                <!-- </a> -->
            </div>
        {/each}
    </div>
</div>

<style>
    .destinations-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Adjust as needed */
        gap: 20px; /* Space between items */
    }

    .destination {
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.2s;
    }

    .destination:hover {
        transform: scale(1.02);
    }

    img {
        max-width: 100%;
        height: auto;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    h2 {
        margin: 0;
        padding: 10px;
        font-size: 1.5em;
    }

    p {
        padding: 0 10px 10px;
        font-size: 1em;
    }

    /* Media query for mobile devices */
    @media (max-width: 767px) {
        .destinations-list {
            grid-template-columns: repeat(2, 1fr); /* Two columns on mobile */
        }
    }
</style>