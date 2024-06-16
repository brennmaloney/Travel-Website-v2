<script>
	import Header from "./header.svelte";
	import Footer from "./footer.svelte";
</script>


<div class="page-container">
    <Header />
    <div class="content">
        <slot></slot>
    </div>
    <Footer />
</div>


<style>
    .page-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    .content {
        flex: 1;
    }
</style>