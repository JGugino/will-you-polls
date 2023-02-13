<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    import { currentUser } from '$lib/stores/currentUser'

    import PollGroup from "$lib/components/polls/PollGroup.svelte";
    import ActiveGroup from '$lib/scripts/activeGroup'
    import PollOptions from '$lib/scripts/pollOptions'

    export let data;

    let activePollGroups = [];

    onMount(async ()=>{
        if(!$currentUser.loggedIn){
            return await goto('/account/signup');
        }

        const urlParams = data.urlParams;
        const createType = urlParams.get('type');
        
        if(createType){
            switch(createType){
                case 'create-group':
                    const groupCreator = urlParams.get('creator');
                    const groupName = urlParams.get('name');
                    
                    if(!groupCreator) return;
                    if(!groupName) return;

                    //TODO: Save group to database under users account

                    activePollGroups.push(new ActiveGroup(crypto.randomUUID(), groupCreator, [], groupName, []));
                break;

                case 'create-poll':
                    const groupID = urlParams.get('group');
                    const pollType = urlParams.get('pollType');
                    const pollQuestion = urlParams.get('question');
                    const pollOptions = urlParams.get('options');

                    if(!groupID) return;
                    if(!pollType) return;
                    if(!pollQuestion) return;

                    console.log(groupID);
                    console.log(activePollGroups);
                break;
            }
        }
    });

    const findActiveGroup = (groupID) => activePollGroups.filter(group => group.groupID === groupID) || null;
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