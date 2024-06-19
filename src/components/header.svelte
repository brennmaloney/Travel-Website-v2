<script>
    import { onMount, onDestroy } from 'svelte';
    import '../global.css';
    import tLogo1 from '../images/logo.png';
    import { page } from '$app/stores';

    let is_mobile = false;
    let show_menu = false;


    function toggleMenu() {
        show_menu = !show_menu;
    }

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

        window.addEventListener('click', function(e) {
            if (show_menu && !document.getElementById('mobile-menu').contains(e.target)) {
                toggleMenu();
            }
        });
    }


    $: currentPath = $page.url.pathname;
</script>

<div class="header-section">
    <div class="{is_mobile ? 'mobile-logo' : 'desktop-logo'}">
        <a href="/">
            <img src={tLogo1} alt="logo">
        </a>
    </div>
    {#if is_mobile}
        <div class="mobile-menu" id="mobile-menu">
            <nav>
                <button class="hamburger-menu {show_menu ? 'active' : ''}" on:click={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
            <div class="off-screen-menu {show_menu ? 'active' : ''}">
                <ul>
                    <li><a href="/" class={currentPath === '/' ? 'active' : ''}>HOME</a></li>
                    <li><a href="/destinations" class={currentPath === '/destination' ? 'active' : ''}>DESTINATIONS</a></li>
                    <li><a href="/bucket" class={currentPath === '/bucket' ? 'active' : ''}>BUCKET LIST</a></li>
                    <li><a href="/about" class={currentPath === '/about' ? 'active' : ''}>ABOUT</a></li>
                </ul>
            </div>
        </div>
    {:else}
        <div class="header-navigation">
            <ul class="nav-list">
                <li class="nav-item"><a href="/" class="nav-link {currentPath === '/' ? 'active' : ''}">HOME</a></li>
                <li class="nav-item"><a href="/destinations" class="nav-link {currentPath === '/destination' ? 'active' : ''}">DESTINATIONS</a></li>
                <li class="nav-item"><a href="/bucket" class="nav-link {currentPath === '/bucket' ? 'active' : ''}">BUCKET LIST</a></li>
                <li class="nav-item"><a href="/about" class="nav-link {currentPath === '/about' ? 'active' : ''}">ABOUT</a></li>
            </ul>
        </div>
    {/if}
</div>

<style>
    .header-section {
        display: flex;
        align-items: center;
        background-image: linear-gradient(#444e39, #768663, #9eaa90);
        height: 7em;
    }

    .mobile-logo img,
    .desktop-logo img  {
        width: 11em;
    }
    .mobile-logo {
        margin-left: var(--gap);
    } 
    .desktop-logo {
        margin-left: calc(var(--gap) * 3.5);
    }

    .header-navigation {
        margin-left: auto;
    }
    .nav-list {
        display: flex;
    }
    .nav-item {
        list-style: none;
        margin-right: calc(var(--gap) * 3.5);
    }
    .nav-link {
        color: #f2eddb;
        text-decoration: none;
        font-size: 18px;
    }
    .nav-link:hover,
    .nav-link:focus {
        color: #fff;
    }
    .nav-link::after {
        content: '';
        height: 2px;
        width: 100%;
        background-color: #444e39;
        display: block;
        opacity: 0;
        transition: all 0.2s;
    }
    .nav-link:hover::after {
        opacity: 1;
    }
    .nav-link.active {
        color: #fff;
    }
    .nav-link.active::after {
        opacity: 1;
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