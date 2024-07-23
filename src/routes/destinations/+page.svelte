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
    .destinations-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }
    .destinations-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        width: 100%;
    }
    .destination {
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.2s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .destination:hover {
        transform: scale(1.02);
    }
    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    /* a {
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
    } */
    h2 {
        margin: 0;
        padding: 10px;
        font-size: 1.5em;
        text-align: center;
    }
    p {
        padding: 0 10px 10px;
        font-size: 1em;
        text-align: center;
    }
</style>