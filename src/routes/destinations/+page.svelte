<script>
    import Globe from '../../components/globe.svelte';
</script>


<div class="destination-section">
    <div class="globe-section">
        <Globe />
    </div>
</div>


<style>
    .destination-section {
        display: flex;
        justify-content: center;
        align-items: center;
        background: url('../../images//travel/sf_beach_cruz.JPEG');
        background-position: center 25%;
    }
    @media (max-width: 767px) {
        .destination-section {
            height: 70vh;
            background-position: center 47%;
        }
    }
</style>