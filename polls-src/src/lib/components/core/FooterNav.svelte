<script>
    const navRoutes = ["/", "/create", "/settings"];
    const navIconParentPath = "./images/nav_icons";

</script>

<nav>
    <a href={navRoutes[0]}><img src={`${navIconParentPath}/home_icon.svg`} alt="Home Button Icon"></a>
    <a href={navRoutes[1]}><img class="main" src={`${navIconParentPath}/create_poll_icon.svg`} alt="Create Poll Button Icon"></a>
    <a href={navRoutes[2]}><img src={`${navIconParentPath}/settings_icon.svg`} alt="Settings Button Icon"></a>
</nav>

<style>
    nav{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        bottom: 0;
        padding: 0.8rem 1.2rem;
        background: var(--rich-black);
        border-radius: 10px 10px 0 0;
    }

    nav a{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 5.4rem;
        background: var(--rich-black);
        border: none;
        cursor: pointer;
    }

    nav a>img{
        width: 36px;
        height: 36px;
        filter: invert(100%) sepia(4%) saturate(7469%) hue-rotate(36deg) brightness(129%) contrast(104%);
    }

    nav a>img:hover{
        filter: invert(57%) sepia(20%) saturate(7000%) hue-rotate(154deg) brightness(87%) contrast(94%);
    }

    .main{
        position: relative;
        width: 46px;
        height: 46px;
    }
</style>