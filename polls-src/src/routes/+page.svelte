<script>
    import PollGroup from "$lib/components/polls/PollGroup.svelte";
    import ActiveGroup from '$lib/scripts/activeGroup.js'
    import PollOptions from '$lib/scripts/pollOptions.js'

    let activePollGroups = [
        new ActiveGroup('family-group', 'gugino', [], 'Family 👪', [
            new PollOptions('yn', ['Will you... create a poll?'], ['repeat', 'pin'], ['This is a comment']),
        ]),
        new ActiveGroup('friends-group', 'gugino', [], 'Friends 🎮', []),
    ];
</script>

<section class="home-section">
    {#each activePollGroups as group}
        <PollGroup bind:activeGroup={group}/>
    {/each}
</section>

<style>
    .home-section{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 5rem;
    }
</style>