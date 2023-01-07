<script>
    import { createEventDispatcher } from "svelte";
    
    const dispatch = createEventDispatcher();

    function handleButtonPush(id){
        dispatch('navButtonPushed', );
    }
</script>

<nav>
    <button on:click|preventDefault|stopPropagation={()=>{handleButtonPush(0)}}><img src="./nav_icons/home_icon.svg" alt="Home Button Icon"></button>
    <button on:click|preventDefault|stopPropagation={()=>{handleButtonPush(1)}}><img class="main" src="./nav_icons/create_poll_icon.svg" alt="Create Poll Button Icon"></button>
    <button on:click|preventDefault|stopPropagation={()=>{handleButtonPush(2)}}><img src="./nav_icons/settings_icon.svg" alt="Settings Button Icon"></button>
</nav>

<style>
    nav{
        width: 100%;
        display: flex;
        justify-content: space-between;
        position: fixed;
        bottom: 0;
        padding: 0.8rem 1.2rem;
        background: var(--rich-black);
        border-radius: 10px 10px 0 0;
    }

    nav button{
        width: 5.4rem;
        background: var(--rich-black);
        border: none;
    }

    nav button>img{
        width: 36px;
        height: 36px;
        filter: invert(100%) sepia(4%) saturate(7469%) hue-rotate(36deg) brightness(129%) contrast(104%);
    }

    nav button>img:hover{
        filter: invert(57%) sepia(20%) saturate(7000%) hue-rotate(154deg) brightness(87%) contrast(94%);
    }

    .main{
        position: relative;
        width: 46px;
        height: 46px;
    }
</style>