<script>
    import '../global.css';
</script>

<footer>
    <div class="footer-section">
        <h2 class="footer-name">Brennan Maloney 2025</h2>
        <div class="footer-icons">
            <a href="https://www.linkedin.com/in/brennanmaloney/" class="Text"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://github.com/brennmaloney" class="Text"><i class="fa-brands fa-square-github"></i></a>
            <a href="https://x.com/_brennanmaloney" class="Text"><i class="fa-brands fa-square-x-twitter"></i></a>
        </div>
        <h2 class="footer-updates-header">Follow to get updates!</h2>
        <input class="footer-updates-input" type="text" placeholder="Email address">
    </div>
</footer>

<style>
    .footer-section {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto;
        align-items: center;
        color: var(--off-white);
        padding: var(--gap);
    }
    .footer-name {
        grid-column: 1/2;
    }
    .footer-icons {
        display: flex;
        gap: var(--gap);
        font-size: 3rem;
        grid-column: 1/2;
    }
    .footer-icons > a {
        color: var(--off-white);
        transition: color 0.15s ease-in;
    }
    .footer-icons > a:hover {
        color: var(--black);
    }
    .footer-updates-header {
        grid-column: 2/3;
        grid-row: 1/2;
    }
    .footer-updates-input {
        grid-column: 2/3;
        border: none;
        border-radius: 8px;
        height: 3em;
        text-align: center;
        font-size: 1rem;
    }
    @media (max-width: 767px) {
        .footer-section {
            padding: calc(var(--gap)/2);
        }
        .footer-icons {
            gap: 0.25em;
        }
    }
</style>
