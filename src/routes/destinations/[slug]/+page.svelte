<script>
    export let data;
    data = data.blogs;
    console.log(data);
</script>

<div class="destination-page">
    <h1>{data.title}</h1>
    {#if data.teaserImage}
        <img class="destination-image" src={data.teaserImage.fields.file.url} alt={data.teaserImage.fields.title} />
    {/if}
    <p class="">{data.teaserDescription}</p>
</div>

<style>
    .destination-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem 2rem;
    }
    .destination-image {
        width: 70%;
    }
</style>
