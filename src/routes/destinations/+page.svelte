<script>
    export let data;
</script>

<div class="destination-section">
    <h1>Destinations</h1>
    <div class="destination-list">
        {#each data.blogs as blog}
            <div class="destination">
                <a class="destination-link" href={`/destinations/${blog.slug}`}>
                    {#if blog.teaserImage}
                        <img class="destination-image" src={blog.teaserImage.fields.file.url} alt={blog.teaserImage.fields.title} />
                    {/if}
                    <div class="destination-text">
                        <h2>{blog.title}</h2>
                        <p>{blog.teaserDescription}</p>
                    </div>
                </a>
            </div>
        {/each}
    </div>
</div>

<style>
    .destination-section {
        padding: 1rem 2rem;
    }
    .destination-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--gap);
    }
    .destination {
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.2s;
    }
    .destination:hover {
        transform: scale(1.01);
    }
    .destination-link {
        text-decoration: none;
        color: inherit;
    }
    .destination-image {
        max-width: 100%;
    }
    .destination-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 0.5rem;
    }

    @media (max-width: 767px) {
        .destination-section {
            padding: 0.5rem 1rem;
        }
        .destination-list {
            grid-template-columns: repeat(2, 1fr);
            gap: calc(var(--gap) / 2);
        }
    }
</style>
