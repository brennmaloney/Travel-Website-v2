<script>
    import '../global.css';
</script>

<div class="footer-section Container">
    <h2 class="footer-name">Brennan Maloney 2025</h2>
    <div class="footer-icons">
        <a href="https://www.linkedin.com/in/brennanmaloney/" class="Text"><i class="fa-brands fa-linkedin"></i></a>
        <a href="https://github.com/brennmaloney" class="Text"><i class="fa-brands fa-square-github"></i></a>
        <a href="https://x.com/_brennanmaloney" class="Text"><i class="fa-brands fa-square-x-twitter"></i></a>
    </div>
    <h2 class="footer-updates-header">Follow to get updates!</h2>
    <input class="footer-updates-input" type="text" placeholder="Enter your email address">
</div>

<style>
    .footer-section {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-top: 2em;
        padding: 1em 5em;
        background-color: var(--dark-green);
        color: var(--off-white);
    }
    .footer-section > div {
        flex-direction: column;
    }
    .footer-name {
        grid-column: 1/2;
    }
    .footer-icons {
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
        height: 3em;
        text-align: center;
        font-size: 1rem;
    }
    @media (max-width: 767px) {
        .footer-section {
            padding: 1em;
        }
    }
</style>
