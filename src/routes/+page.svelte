<script>
    export let data;

    import Globe from '../components/globe.svelte';
    import Wave from '../components/wave.svelte';
    import strings from '../../strings.js.json';
    import '../global.css';
</script>

<div class="destination-section">
    <div class="welcome-hero">
        <div class="hero-messaging">
            <h1>Welcome</h1>
            <Wave colour={'#a2c3a8'} />
        </div>
    </div>
    <div class="globe-section">
        <div class="about-globe Desktop">
            <h1>Our Globe</h1>
            <h3>{strings.globeDescription}</h3>
        </div>
        <div class="globe">
            <Globe {data}/>
        </div>
        <div class="places-traveled Desktop">
            <h1>Places We've Been</h1>
        </div>
    </div>
    <div class="about-section">
        <Wave colour={'#a2c3a8'} flip={true} />
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--mint);
        width: 100%;
    }
    .globe-section > .globe {
        min-width: 70%;
        min-height: 70%;
    }
    .globe-section > .about-globe,
    .globe-section > .places-traveled {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 15%;
        height: 100%;
    }

    .about-section {
        position: relative;
        height: 30vh;
        width: 100%;
    }
</style>
