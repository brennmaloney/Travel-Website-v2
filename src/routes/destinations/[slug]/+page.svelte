<script>
    export let data;
    data = data.blog;
</script>

<h1 class="Center">{data.title}</h1>

{#if data.teaserImage}
    <div class="Center">
        <img class="destination-image" src={data.teaserImage.fields.file.url} alt={data.teaserImage.fields.title} />
    </div>
{/if}

<p class="Center">{data.teaserDescription}</p>

<style>
    .destination-image {
        width: 70%;
    }
</style>
