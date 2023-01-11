<script>
    export let pollQuestion = "Will you... create a poll?";
    export let pollComments = [];
</script>

<div class="poll-base">
    <div class="poll-status-left">
        <img class="poll-status-icon" src="./images/poll_icons/poll_pin_icon.svg" alt="Notify members of this group icon">
    </div>
    <div class="poll-content">
        <h3>{pollQuestion}</h3>
        <slot name="poll-slot"></slot>
        <p>comments ({pollComments.length})</p>
    </div>
    <div class="poll-status-right">
        <img class="poll-status-icon" src="./images/poll_icons/poll_notify_icon.svg" alt="Notify members of this group icon">
        <img class="poll-status-icon" src="./images/poll_icons/poll_repeat_icon.svg" alt="Repeat this poll at a specified time">
    </div>
</div>

<style>
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
    }

    .poll-content{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem;
    }

    .poll-status-right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .poll-status-icon{
        width: 24px;
        height: 24px;
        filter: invert(98%) sepia(1%) saturate(501%) hue-rotate(216deg) brightness(120%) contrast(100%);
        opacity: 60%;
    }
</style>