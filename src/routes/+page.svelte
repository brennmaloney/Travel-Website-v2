<script>
    import Globe from '../components/globe.svelte';
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
        background: url('../images/travel/bc/bc_landscape_bg.jpg') no-repeat center;
        background-size: cover;
    }
    @media (max-width: 767px) {
        .destination-section {
            height: 70vh;
            background: url('../images/travel/bc/bc_portrait_bg.jpg') no-repeat center;
        }
    }
</style>
