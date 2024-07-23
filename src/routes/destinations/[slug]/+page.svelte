<script>
    export let data;
    data = data.blogs;
    console.log(data);
</script>

<div class="destination-page">
    <h1>{data.title}</h1>
    {#if data.teaserImage}
        <img src={data.teaserImage.fields.file.url} alt={data.teaserImage.fields.title} />
    {/if}
    <div>{@html data.teaserDescription}</div>
</div>