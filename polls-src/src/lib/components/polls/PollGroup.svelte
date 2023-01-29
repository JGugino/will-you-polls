<script>
    import PollBase from "$lib/components/polls/PollBase.svelte";
    import {currentUser} from '$lib/stores/currentUser';

    export let activeGroup;
    let pollGroupOpen = false;

    const toggleGroup = (on)=>{pollGroupOpen = on};

</script>

<section class="poll-group">
    <div class="group-header">
        <div class="group-title">
            <h2>{activeGroup.groupTitle}</h2>
        </div>

        {#if pollGroupOpen}
            <button on:click|preventDefault={()=>{toggleGroup(false)}}><img src="./images/poll_group_show_less.svg" alt="the poll groups show less group button icon"></button>
        {:else}
            <button on:click|preventDefault={()=>{toggleGroup(true)}}><img src="./images/poll_group_show_more.svg" alt="the poll groups expand group button icon"></button>
        {/if}
    </div>

    {#if pollGroupOpen}
    <section class="active-polls">
        {#if activeGroup.groupPolls.length > 0}
            {#each activeGroup.groupPolls as poll}
                <PollBase bind:pollOptions={poll}/>
            {/each}
        {:else}
            <div class="no-polls-dialouge">
                <p class="no-polls">Doesn't look like there are any polls 👎</p>
                {#if activeGroup.groupOwner === $currentUser.userID}
                    <a href={`/create?type=poll&group=${activeGroup.groupID}`}><img src="./images/nav_icons/create_icon.svg" alt="Icon to create a new pull inside the current group"></a>
                {/if}
            </div>  
        {/if}
    </section>
    {/if}
</section>

<style>
    .poll-group{
        width: 96%;
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
    
    .active-polls{
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        padding: 0.8rem 0;
        max-height: 21.8rem;
        overflow-y: scroll;
    }

    .no-polls-dialouge{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.6rem;
        user-select: none;
    }

    .no-polls-dialouge a{
        background: var(--rich-black);
        border: none;
        cursor: pointer;
    }

    .no-polls-dialouge img{
        width: 36px;
        height: 36px;
        filter: invert(100%) sepia(4%) saturate(7469%) hue-rotate(36deg) brightness(129%) contrast(104%);
    }

    .no-polls-dialouge img:hover{
        filter: invert(57%) sepia(20%) saturate(7000%) hue-rotate(154deg) brightness(87%) contrast(94%);
    }

    .no-polls{
        text-align: center;
        font-weight: 600;
        color: var(--light-red);
    }
</style>