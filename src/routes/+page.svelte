<script>
    export let data;

    import strings from '../../strings.js.json';
    import '../global.css';

    import Globe from '../components/globe.svelte';
    import Carousel from '../components/carousel.svelte';
    import Hero from '../components/hero.svelte'; 

    const image = '/images/bc_joffre_first.JPEG';
</script>


<Hero {image}, title="Come Follow Our Travels"/>


<div class="globe-section Center Container">
    <div class="about-globe">
        <h1>Our Globe</h1>
        <h3>{strings.globeDescription}</h3>
    </div>
    <Globe {data}/>
</div>

<div class="Center">
    <Carousel {data}/>
</div>

<div class="globe-section Center Container">
    <div>
        <a class="h1 Link Text" href="/destinations">Click To See Where We Have Traveled</a>
    </div>
</div>


<style>
    .globe-section {
        flex-direction: column;
        text-align: center;
        background-color: var(--light-grey);
    }
    .globe-section a {
        font-family: var(--title-font);
        font-size: 3.5rem;
    }

    @media (max-width: 767px) {
        .globe-section a {
            font-size: 2rem;
        }
    }
</style>
