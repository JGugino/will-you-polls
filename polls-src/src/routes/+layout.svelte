<script>
    import { currentUser } from '$lib/stores/currentUser'

    import Header from "$lib/components/core/Header.svelte";
    import FooterNav from "$lib/components/core/FooterNav.svelte";
</script>

<svelte:head>
    <title>Will You? - When you need to know</title>
    <link rel="stylesheet" href="/app.css">
</svelte:head>

<Header />

<main>
    <slot/>
</main>

{#if $currentUser.loggedIn}
<FooterNav/>
{/if}

<style>

</style>