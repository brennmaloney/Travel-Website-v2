<script>
    import Globe from '../components/globe.svelte';
    import Wave from '../components/wave.svelte';
    import '../global.css';
</script>

<div class="destination-section">
    <div class="welcome-hero">
        <div class="hero-messaging">
            <h1>Welcome</h1>
            <Wave colour={'#adcfb3'} />
        </div>
    </div>
    <div class="globe-section">
        <Globe />
    </div>
    <div class="about-section">
        <Wave colour={'#adcfb3'} flip={true} />
    </div>
</div>

<style>
    .destination-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .welcome-hero {
        position: relative;
        background-color: var(--light-yellow);
        height: 85vh;
        width: 100%;
    }
    .hero-messaging {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .globe-section {
        position: relative;
        background-color: var(--mint);
        width: 100%;
    }

    .about-section {
        position: relative;
        height: 30vh;
        width: 100%;
    }
</style>
