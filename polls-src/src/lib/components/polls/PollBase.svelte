<script>
    import { onMount } from "svelte";
    import { currentUser } from '$lib/stores/currentUser.js';

    import ProgressBar from "$lib/components/polls/ProgressBar.svelte";

    export let pollOptions;

    let pollSubmitted = false;

    onMount(()=>{ initPoll(); });

    function initPoll(){
        pollSubmitted = !hasContributed($currentUser.userID);

        switch(pollOptions.pollType){
            case 'yn':
                
                break;
        }
    }

    function handlePollSubmit(choice){
        if(!pollSubmitted){
            pollOptions.pollContributors.push({userID: $currentUser.userID, choice});
            console.log(pollOptions.pollContributors);
            pollSubmitted = hasContributed($currentUser.userID);
        }
    }

    const hasContributed = (user) => pollOptions.pollContributors.filter(contributor => contributor.userID == user.userID).length > 0 || false;
</script>

<div class="poll-base">
    <!--### POLL LEFT STATUS BAR ###-->
    <div class="poll-status-left">
        {#if pollOptions.pollStatuses.includes('pin')}
            <img class="poll-status-icon" src="./images/poll_icons/poll_pin_icon.svg" alt="Pin this poll icon">
        {/if}
    </div>

    <!--### POLL INNER CONTENT ###-->
    <div class="poll-content">
        <h3>{pollOptions.pollQuestions[0] || 'Error loading question'}</h3>

        <div class="poll-area">
            <!--### POLL OPTIONS ###-->
            {#if pollOptions.pollType == 'yn'}
                <div class="yes-no-poll">
                    {#if pollSubmitted}
                        <ProgressBar />  
                        <ProgressBar />  
                    {:else}
                        <button class="option-button" on:click|preventDefault|stopPropagation={()=>{handlePollSubmit('yes')}}>YES</button>
                        <button class="option-button" on:click|preventDefault|stopPropagation={()=>{handlePollSubmit('no')}}>NO</button>
                    {/if}
                </div>
            {/if}
        </div>

        <p>comments ({pollOptions.pollComments.length || 0})</p>
    </div>

    <!--### POLL RIGHT STATUS BAR ###-->
    <div class="poll-status-right">
        {#if pollOptions.pollStatuses.includes('notify')}
            <img class="poll-status-icon" src="./images/poll_icons/poll_notify_icon.svg" alt="Notify members of this group icon">
        {/if}

        {#if pollOptions.pollStatuses.includes('repeat')}
            <img class="poll-status-icon" src="./images/poll_icons/poll_repeat_icon.svg" alt="Repeat this poll at a specified time">
        {/if}
    </div>
</div>

<style>

    /*### POLL BASE STYLING ###*/

    .poll-base{
        display: flex;
        justify-content: space-between;
        background: var(--charcoal);
        padding: 0.6rem;
        border-radius: 10px;
    }

    .poll-status-left{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 24px;
    }

    .poll-content{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem;
        width: 90%;
    }

    .poll-content>h3{
        text-align: center;
        text-decoration: underline;
    }

    .poll-area{
        width: 100%;
    }

    .poll-status-right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 24px;
    }

    .poll-status-icon{
        width: 24px;
        height: 24px;
        filter: invert(98%) sepia(1%) saturate(501%) hue-rotate(216deg) brightness(120%) contrast(100%);
        opacity: 60%;
    }

    /* ### POLL OPTIONS STYLING ### */

    .yes-no-poll{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.6rem;
   }

   .option-button{
    width: 100%;
    height: 2.6rem;
    border-radius: 10px;
    border: 1px solid var(--white);
    background: var(--rich-black);
    color: var(--white);
    cursor: pointer;
    font-size: 14pt;
    transition: color, background ease-in-out 200ms;
   }

   .option-button:hover{
    background-color: var(--blue-green);
    color: var(--rich-black);
   }
</style>