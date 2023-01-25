<script>
    import { onMount } from "svelte";

    export let barText = 'VOID';
    export let barPercent = '20%';

    const barID = crypto.randomUUID();

    onMount(()=>{ initBar(); });

    function initBar(){
        const progressBar = document.querySelector(`.progress-bar-${barID}`);
        const progressBarFill = document.querySelector(`.progress-bar-fill-${barID}`);
        const progressBarText = document.querySelector(`.progress-bar-text-${barID}`);

        const barStyles = {
            position: 'relative',
            width: '100%',
            height: '2.6rem',
            background: 'var(--rich-black)',
            borderRadius: '10px',
            border: '1px solid var(--white)',
            overflow: 'hidden'
        }

        const fillStyles = {
            width: barPercent || '50%',
            height: '100%',
            background: 'var(--charcoal)'
        }

        const textStyles = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '14pt'
        }

        Object.assign(progressBar.style, barStyles);
        Object.assign(progressBarFill.style, fillStyles);
        Object.assign(progressBarText.style, textStyles);
    }

</script>

<div class={`progress-bar-${barID}`}>
    <div class={`progress-bar-fill-${barID}`}></div>
    <span class={`progress-bar-text-${barID}`}>{`${barText} - ${barPercent}`}</span>
</div>