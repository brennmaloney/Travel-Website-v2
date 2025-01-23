<script>
    export let data;

    import Globe from '../components/globe.svelte';
    import Wave from '../components/wave.svelte';
    import strings from '../../strings.js.json';
    import '../global.css';
</script>

<div class="destination-section">
    <div class="welcome-hero Center">
        <h1 class="hero-title">Come Follow Our Travels</h1>
        <Wave colour={'#a2c3a8'} />
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
        height: 75vh;
        width: 100%;
        background-image: url(../images/travel/bc/bc_joffre_first.JPEG);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .hero-title {
        color: white;
        font-family: var(--title-font);
        font-size: 8rem;
        padding-bottom: 0.5em;
        text-shadow: 1px 1px 4px black;
        text-align: center;
    }
    @media (max-width: 767px) {
        .hero-title {
            font-size: 3rem;
            margin: 0.25em;
        }
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
