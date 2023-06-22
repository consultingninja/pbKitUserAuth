<nav>
    <a href="/">Home</a>
    <a href="/register">Register</a>
    <a href="/login">Login</a>
    <a data-sveltekit-preload-data=off href="/auth">Auth</a>
    <a data-sveltekit-preload-data=off href="/logout">Logout</a>
</nav>


<style>
    nav{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    nav a{
        margin: .5em;
        color: #000000;
        text-decoration: none;
        font-weight: 800;
    }
    nav a:hover{
        text-decoration: underline;
    }
</style>