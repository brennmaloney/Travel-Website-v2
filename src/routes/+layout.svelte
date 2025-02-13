<script>
	import Header from "../components/header.svelte";
	import Footer from "../components/footer.svelte";
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

    injectSpeedInsights();
</script>


<svelte:head>
    <title>Backpack Travels</title>
</svelte:head>


<Header />

<slot></slot>

<Footer />

