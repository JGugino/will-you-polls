<script>
    function handleSignupForm(e){
        const formData = new FormData(e.target);

        //TODO: Finish account signup
    }
</script>

<section class='sign-up-section'>
    <form on:submit|preventDefault|stopPropagation={handleSignupForm}>
        <input type="text" name="sign-up-firstname" id="sign-up-firstname" placeholder="First Name">
        <input type="text" name="sign-up-lastname" id="sign-up-lastname" placeholder="Last Name">
        <input type="text" name="sign-up-username" id="sign-up-username" placeholder="Username">
        <input type="email" name="sign-up-email" id="sign-up-email" placeholder="Email">
        <input type="password" name="sign-up-password" id="sign-up-password" placeholder="Password">
        <input type="password" name="sign-up-password-confirm" id="sign-up-password-confirm" placeholder="Confirm Password">
        <button type="submit">Sign Up</button>
    </form>
</section>

<style>

</style>