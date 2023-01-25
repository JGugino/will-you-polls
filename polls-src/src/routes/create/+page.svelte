<script>

</script>

<section class="create-section">
    <button class="create-button">Create Group</button>
    <button class="create-button">Create Yes/No Poll</button>
</section>

<style>
    .create-section{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        margin: 2.4rem 0;
    }
    
    .create-button{
        width: 100%;
        height: 4rem;
        border-radius: 10px;
        border: 1px solid var(--white);
        background: var(--rich-black);
        color: var(--white);
        cursor: pointer;
        transition: color, background ease-in-out 200ms;
        font-size: 20pt;
    }

    .create-button:hover{
        background-color: var(--blue-green);
        color: var(--rich-black);
   }
</style>