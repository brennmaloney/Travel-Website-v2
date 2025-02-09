<script>
    export let data;

    import Globe from '../components/globe.svelte';
    import Wave from '../components/wave.svelte';
    import Carousel from '../components/carousel.svelte';
    import strings from '../../strings.js.json';
    import '../global.css';

    const colour = '#a3c3a8';
</script>

<div class="destination-section">
    <div class="welcome-hero Center">
        <h1 class="hero-title">Come Follow Our Travels</h1>
        <Wave {colour} />
    </div>
    <div class="globe-section Center">
        <div class="about-globe">
            <h1>Our Globe</h1>
            <h3>{strings.globeDescription}</h3>
        </div>
        <Globe {data}/>
    </div>
    <div class="Wave">
        <Wave {colour} flip={true} />
    </div>
    <div class="Center">
        <Carousel {data}/>
    </div>
    <div class="Wave">
        <Wave {colour} secondary={true} />
    </div>
    <div class="globe-section Center">
        <div class="">
            <a class="h1 Link Text" href="/destinations">See Where We Have Traveled</a>
        </div>
    </div>
    <div class="Wave">
        <Wave {colour} flip={true} secondary={true} />
    </div>
</div>

<style>
    .destination-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
    }
    .welcome-hero {
        position: relative;
        background-color: var(--light-yellow);
        height: 85vh;
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
        flex-direction: column;
        text-align: center;
        background-color: var(--mint);
    }
</style>
