<script>
    export let pollGroupTitle = "Example Group";
    let pollGroupOpen = false;

    const toggleGroup = (on)=>{pollGroupOpen = on};

</script>

<section class="poll-group">
    <div class="group-header">
        <div class="group-title">
            <h2>{pollGroupTitle}</h2>
        </div>

        {#if pollGroupOpen}
            <button on:click|preventDefault={()=>{toggleGroup(false)}}><img src="./images/poll_group_show_less.svg" alt="the poll groups show less group button icon"></button>
        {:else}
            <button on:click|preventDefault={()=>{toggleGroup(true)}}><img src="./images/poll_group_show_more.svg" alt="the poll groups expand group button icon"></button>
        {/if}
    </div>

    {#if pollGroupOpen}
    <section class="active-polls">
        <h2>Polls</h2>
    </section>
    {/if}
</section>

<style>
    .poll-group{
        width: 90%;
        margin: 1rem 0 0 0;
        background: var(--rich-black);
        color: var(--white);
        border-radius: 10px;
        padding: 0 1rem;
    }

    .group-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .group-header button{
        background: var(--rich-black);
        border: 0;
        border-radius: 10px;
    }

    .group-header button>img{
        filter: invert(16%) sepia(41%) saturate(5299%) hue-rotate(337deg) brightness(91%) contrast(94%);
    }
</style>