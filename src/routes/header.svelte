<script>
    import { onMount, onDestroy } from 'svelte';
    import '../global.css';
    import tLogo1 from '../images/logo.png';

    let is_mobile = false;
    let show_menu = false;

    if (typeof window !== 'undefined') {
        onMount(() => {
            is_mobile = window.innerWidth <= 767;
            window.addEventListener('resize', handleResize);
        });

        function handleResize() {
            is_mobile = window.innerWidth <= 767;
        }

        onDestroy(() => {
            window.removeEventListener('resize', handleResize);
        });
    }

    function toggleMenu() {
        show_menu = !show_menu;
    }
</script>

<div class="header-section">
    <div class="{is_mobile ? 'mobile-logo' : 'desktop-logo'}">
        <a href="/">
            <img src={tLogo1} alt="logo">
        </a>
    </div>
    {#if is_mobile}
        <div class="mobile-menu">
            <nav>
                <button class="hamburger-menu {show_menu ? 'active' : ''}" on:click={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
            <div class="off-screen-menu {show_menu ? 'active' : ''}">
                <ul>
                    <li><a href="/">HOME</a></li>
                    <li><a href="/">DESTINATIONS</a></li>
                    <li><a href="/">BUCKET LIST</a></li>
                    <li><a href="/">ABOUT</a></li>
                </ul>
            </div>
        </div>
    {:else}
        <div class="header-links">
            <a href="/">HOME</a>
            <a href="/">DESTINATIONS</a>
            <a href="/">BUCKET LIST</a>
            <a href="/">ABOUT</a>
        </div>
    {/if}
</div>

<style>
    .header-section {
        display: flex;
        align-items: center;
        background-color: #768663;
        height: 15vh;
    }

    .mobile-logo img {
        width: 15vh;
    }

    .desktop-logo img {
        width: 20vh;
    }

    .mobile-logo, .desktop-logo {
        margin-left: 5vh;
    }

    .header-links {
        margin-left: auto;
        margin-right: 5vh;
    }

    .header-links a {
        margin-right: 5vh;
        text-decoration: none;
        color: rgb(250, 243, 238);
        font-size: 18px;
        font-family: 'NotoSansRegular';
    }

    .off-screen-menu {
        background-color: #768663;
        height: 100vh;
        width: 100%;
        max-width: 450px;
        position: fixed;
        top: 0;
        right: -450px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 3rem;
        transition: .3s ease;
    }

    .off-screen-menu.active {
        right: 0;
    }

    .off-screen-menu a {
        font-size: 20px;
        text-decoration: none;
        color: rgb(250, 243, 238);
    }

    nav {
        padding: 1rem;
        display: flex;
        background-color: #768663;
    }

    .hamburger-menu {
        height: 50px;
        width: 50px;
        margin-left: auto;
        position: relative;
        background: transparent;
        border: none;
        cursor: pointer;
        z-index: 1;
    }

    .hamburger-menu span {
        height: 5px;
        width: 100%;
        background-color: white;
        border-radius: 25px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: .3s ease;
    }

    .hamburger-menu span:nth-child(1) {
        top: 25%;
    }

    .hamburger-menu span:nth-child(3) {
        top: 75%;
    }

    .hamburger-menu.active span:nth-child(1) {
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
    }

    .hamburger-menu span:nth-child(2) {
        opacity: 0;
    }

    .hamburger-menu.active span:nth-child(3) {
        top: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
    }
</style>