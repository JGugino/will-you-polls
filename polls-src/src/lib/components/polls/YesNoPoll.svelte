<script>
    import PollBase from "./PollBase.svelte";

    export let pollOptions = ['YES', 'NO']

    let selectedPollOptions;

    //TODO: Add Yes/No Poll Functionality
</script>

<PollBase>
    <div slot="poll-slot" class="yes-no-poll">
        {#each pollOptions as option}
            <button class="option-button">{option}</button>
        {/each}
    </div>
</PollBase>

<style>
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
    transition: color, background ease-in-out 200ms;
   }

   .option-button:hover{
    background-color: var(--blue-green);
    color: var(--rich-black);
   }
</style>