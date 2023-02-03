<script>
    import { goto } from '$app/navigation';
    import { currentUser } from '$lib/stores/currentUser';

    export let data;
    $: ({ urlParams } = data);

    let createType = 'poll';
    $: createType = urlParams.get('type') || 'poll';

    let groupID = "none";
    $: groupID = urlParams.get('group') || 'none';

    let groupName = "";
    let pollGroup = "";
    let pollType = "yn";
    let pollStarter = "will";
    let pollQuestion = "";
    let pollRepeat = false;
    let pollNotify = false;
    let pollPin = false;

    //TODO: Set the selected group after loading 

    async function handleCreation(){
        let transferURL = "/";

        if(createType === 'poll'){
            if(pollQuestion.length <= 0) return;

            let options = formatOptions();
            if(pollType == 'yn'){
                transferURL = '/?type=create-poll&group='+groupID+'&pollType='+pollType+'&question='+pollQuestion+'&starter'+pollStarter+'&options='+options;
            }
        }else if(createType === 'group'){

            if(groupName.length <= 0) return;

            transferURL = '/?type=create-group&creator='+$currentUser.userID+'&name='+groupName;
        }

        await goto(transferURL);
    }

    function formatOptions(){
        let options = [];
        if(pollRepeat){
            options.push('repeat');
        }
        if(pollPin){
            options.push('pin');
        }
        if(pollNotify){
            options.push('notify');
        }

        let finalString = '';

        options.forEach(option => {
            if(options.indexOf(option) != options.length - 1){
                finalString += option+'/';
            }else{
                finalString += option;
            }
        });

        return finalString;
    }

</script>

<section class="create-section">
    {#if createType === 'poll'}
        <h2 class="create-title">Create Poll</h2>
        <div class="custom-select">
            <label for="poll-type-selector">Poll Type</label>
            <select name="poll-type-select" id='poll-type-selector' class="poll-type-selector" bind:value={pollType}>
                <option value="yn">Yes/No Poll</option>
                <option value="cust">Custom Poll</option>
            </select>
        </div>

        {#if groupID == 'none'}
            <div class="custom-select">
                <label for="poll-type-selector">Group</label>
                <select name="poll-type-select" id='poll-type-selector' class="poll-type-selector" bind:value={pollGroup}>
                    <!--TODO: Load in groups owned by current user-->
                    <option value="yn">Group One</option>
                    <option value="cust">Group Two</option>
                </select>
            </div>
        {:else}
            <h3>Selected: {groupID}</h3>
        {/if}
        
        <div class="custom-select">
            <label for="poll-type-selector">Starter</label>
            <select name="poll-starter-select" id='poll-starter-selector' class="poll-starter-selector" bind:value={pollStarter}>
                <option value="will">Will you</option>
                <option value="can">Can you</option>
                <option value="how">How are</option>
                <option value="do">Do you</option>
            </select>
        </div>

        <input type="text" name="poll-question-input" id="poll-question-input" class='create-input' bind:value={pollQuestion} placeholder="Poll Question">
        
        {#if pollType == 'cust'}
            <!-- <input type="text" name="group-name-input" id="group-name-input" class='create-input' bind:value={groupName} placeholder="Poll Question"> -->
        {/if}
        
        <label for="poll-repeat-option">Repeat Poll</label>
        <input type="checkbox" name="poll-repeat-option" id="poll-repeat-option" bind:checked={pollRepeat}>

        <label for="poll-repeat-option">Pin Poll</label>
        <input type="checkbox" name="poll-pin-option" id="poll-pin-option" bind:checked={pollPin}>

        <label for="poll-repeat-option">Notify Members</label>
        <input type="checkbox" name="poll-notify-option" id="poll-notify-option" bind:checked={pollNotify}>

        <button class='create-button' on:click|preventDefault|stopPropagation={handleCreation}>Create Poll</button>
    {:else if createType === 'group'}
        <h2 class="create-title">Create Group</h2>
        <input type="text" name="group-name-input" id="group-name-input" class='create-input' bind:value={groupName} placeholder="Group Name">
        <button class='create-button' on:click|preventDefault|stopPropagation={handleCreation}>Create Group</button>
    {/if}
</section>

<style>
    .create-section{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        margin: 1rem 0;
    }
    
    .create-title{
        font-size: 20pt;
        text-decoration: underline;
    }

    .create-button{
        width: 50%;
        height: 3rem;
        border-radius: 10px;
        border: 1px solid var(--white);
        background: var(--rich-black);
        color: var(--white);
        cursor: pointer;
        transition: color, background ease-in-out 200ms;
        font-size: 16pt;
    }

    .create-button:hover{
        background-color: var(--blue-green);
        color: var(--rich-black);
    }

    .create-input{
        width: 80%;
        height: 2.8rem;
        font-size: 16pt;
        padding: 0 0 0 0.8rem;
        border-radius: 10px;
        border: 0;
        background: var(--rich-black);
        color: var(--white);
    }

    .create-input:focus{
        border: 2px solid var(--blue-green);
        outline: none;
    }

    .create-input::placeholder{
        color: #d1d1d1;
    }

</style>