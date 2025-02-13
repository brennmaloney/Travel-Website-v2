<script>
    import { onMount, onDestroy } from 'svelte';
    import '../global.css';
    import tLogo1 from '../images/main/logo.png';
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

        window.addEventListener('click', function (e) {
            if (show_menu && !document.getElementById('mobile-menu').contains(e.target)) {
                toggleMenu();
            }
        });
    }

    $: currentPath = $page.url.pathname;
</script>

<header>
    <div class="header-section">
        <div class={is_mobile ? 'mobile-logo' : 'desktop-logo'}>
            <a href="/">
                <img src={tLogo1} alt="logo" />
            </a>
        </div>
        <div class="mobile-menu Mobile" id="mobile-menu">
            <nav>
                <button class="hamburger-menu {show_menu ? 'active' : ''}" on:click={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
            <nav class="off-screen-menu {show_menu ? 'active' : ''}">
                <ul>
                    <li><a href="/" class={currentPath === '/' ? 'active' : ''} on:click={toggleMenu}>HOME</a></li>
                    <li><a href="/destinations" class={currentPath === '/destinations' ? 'active' : ''} on:click={toggleMenu}>DESTINATIONS</a></li>
                    <li><a href="/bucket" class={currentPath === '/bucket' ? 'active' : ''} on:click={toggleMenu}>BUCKET LIST</a></li>
                    <li><a href="/about" class={currentPath === '/about' ? 'active' : ''} on:click={toggleMenu}>ABOUT</a></li>
                </ul>
            </nav>
        </div>
        <nav class="header-navigation Desktop">
            <ul class="nav-list">
                <li class="nav-item"><a href="/" class="nav-link {currentPath === '/' ? 'active' : ''}">HOME</a></li>
                <li class="nav-item"><a href="/destinations" class="nav-link {currentPath === '/destinations' ? 'active' : ''}">DESTINATIONS</a></li>
                <li class="nav-item"><a href="/bucket" class="nav-link {currentPath === '/bucket' ? 'active' : ''}">BUCKET LIST</a></li>
                <li class="nav-item"><a href="/about" class="nav-link {currentPath === '/about' ? 'active' : ''}">ABOUT</a></li>
            </ul>
        </nav>
    </div>
</header>


<style>
    .header-section {
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 10;
        height: 10vh;
    }

    .mobile-logo img,
    .desktop-logo img {
        width: 11em;
    }

    .header-navigation {
        margin-left: auto;
    }
    .nav-list {
        display: flex;
    }
    .nav-item {
        list-style: none;
        margin-left: calc(var(--gap) * 3.5);
    }
    .nav-link {
        color: var(--off-white);
        text-decoration: none;
        font-size: 18px;
    }
    .nav-link:hover,
    .nav-link:focus {
        color: var(--white);
    }
    .nav-link::after {
        content: '';
        height: 2px;
        width: 100%;
        background-color: var(--dark-green);
        display: block;
        opacity: 0;
        transition: all 0.2s;
    }
    .nav-link:hover::after {
        opacity: 1;
    }
    .nav-link.active {
        color: var(--white);
    }
    .nav-link.active::after {
        opacity: 1;
    }
</style>
