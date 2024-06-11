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
            <ul>
                <li><a href="/">HOME</a></li>
                <li><a href="/">DESTINATIONS</a></li>
                <li><a href="/">BUCKET LIST</a></li>
                <li><a href="/">ABOUT</a></li>
            </ul>
        </div>
    {/if}
</div>

<style>
    .header-section {
        display: flex;
        align-items: center;
        background-color: #768663;
        height: 7em;
    }

    .mobile-logo img {
        width: 10em;
    }
    .desktop-logo img {
        width: 11em;
    }
    .mobile-logo {
        margin-left: var(--gap);
    } 
    .desktop-logo {
        margin-left: calc(var(--gap) * 3.5);
    }

    .header-links {
        margin-left: auto;
    }
    .header-links ul {
        display: flex;
        justify-content: space-around;
        margin: auto;
    }
    .header-links li {
        position: relative;
        list-style: none;
    }
    .header-links li::after {
        content: '';
        position: absolute;
        background-color: #444e39;
        height: 2px;
        width: 0;
        left: 0;
        bottom: -4px;
        transition: all 0.5s ease;
    }
    .header-links a:hover {
        color: #ffffff;
    }
    .header-links li:hover::after {
        width: 100%;
    }
    .header-links a {
        margin-right: calc(var(--gap) * 3.5);
        color: #f2eddb;
        text-decoration: none;
        font-size: 18px;
    }

    .mobile-menu {
        margin-left: auto;
        margin-right: var(--gap);
    }

    .off-screen-menu {
        padding-top: calc(var(--gap) * 2);
        background-color: #768663;
        height: 100%;
        width: 55%;
        position: fixed;
        top: 0;
        right: -450px;
        font-size: 3rem;
        transition: .3s ease;
    }
    .off-screen-menu.active {
        right: 0;
    }
    .off-screen-menu li {
        list-style-type: none;
    }
    .off-screen-menu a {
        font-size: 20px;
        text-decoration: none;
        color: #f2eddb;
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
        display: block;
        height: 5px;
        width: 100%;
        background-color: #f2eddb;
        border-radius: 25px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
        transition: .3s ease;
    }
    .hamburger-menu span:nth-child(1) {
    top: 10px;
    }
    .hamburger-menu span:nth-child(2) {
        top: 22px; 
    }
    .hamburger-menu span:nth-child(3) {
        top: 34px;
    }
    .hamburger-menu.active span:nth-child(1) {
        top: 22px;
        transform: translateX(-50%) rotate(45deg);
    }
    .hamburger-menu.active span:nth-child(2) {
        opacity: 0;
    }
    .hamburger-menu.active span:nth-child(3) {
        top: 22px;
        transform: translateX(-50%) rotate(-45deg);
    }
</style>