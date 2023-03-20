<script>

    import { goto } from '$app/navigation';
    import { currentUser } from '$lib/stores/currentUser';

    let currentError = 'none';

    async function handleSignupForm(e){
        const formData = new FormData(e.target);

        const createResponse = await fetch('/api/accounts/create', { 
            method: 'POST', 
            body: JSON.stringify({
                firstName: formData.get('signup-first-name'),
                lastName: formData.get('signup-last-name'),
                username: formData.get('signup-username'),
                email: formData.get('signup-email'),
                password: formData.get('signup-password'),
                passwordConfirm: formData.get('signup-password-confirm')
            })
        });

        const responseJson = await createResponse.json();

        if(responseJson.status !== 200){
            return setErrorMessage(responseJson.body.message | "invalid-request");
        }

        resetErrorMessage();

        $currentUser.uuid = responseJson.body.data.uuid;
        $currentUser.username = responseJson.body.data.username;
        $currentUser.loggedIn = true;

        await goto(`/`);
    }

    function setErrorMessage(error){
        switch(error){
            case 'invaild-request':
                currentError = 'You must fill in all required fields required'
                break;
            case 'first-name-required':
                currentError = 'You must enter a first name'
                break;
            case 'last-name-required':
                currentError = 'You must enter a last name'
                break;
            case 'username-required':
                currentError = 'You must enter a username'
                break;
            case 'email-required':
                currentError = 'You must enter an email'
                break;
            case 'password-required':
                currentError = 'You must enter a password'
                break;
            case 'password-confirm-required':
                currentError = "You must confirm your password"
                break;
            case 'passwords-dont-match':
                currentError = "Your passwords don't match"
                break;
            case 'password-too-short':
                currentError = 'Your password is too short (12 characters)'
                break;
            case 'username-too-long':
                currentError = 'Your username is too long (60 characters)'
                break;
            case 'username-taken':
                currentError = 'The username you entered is already taken'
                break;
            case 'email-taken':
                currentError = 'The email you entered is already taken'
                break;
        }
    }

    function resetErrorMessage() { currentError = 'none' }
</script>

<svelte:head>
    <title>Will You? - Signup for an account</title>
</svelte:head>

<section class='signup-section'>
    <h2>Signup</h2>
    {#if currentError !== 'none'}
        <p class="error-msg">{currentError}</p>
    {/if}
    <form on:submit|preventDefault|stopPropagation={handleSignupForm}>
        <input class="create-input" type="text" name="signup-first-name" id="signup-first-name" placeholder="First Name" required>
        <input class="create-input" type="text" name="signup-last-name" id="signup-last-name" placeholder="Last Name" required>
        <input class="create-input" type="text" name="signup-username" id="signup-username" placeholder="Username" required>
        <input class="create-input" type="email" name="signup-email" id="signup-email" placeholder="Email" required>
        <input class="create-input" type="password" name="signup-password" id="signup-password" placeholder="Password" required>
        <input class="create-input" type="password" name="signup-password-confirm" id="signup-password-confirm" placeholder="Confirm Password" required>
        <button class="create-button" type="submit">Sign Up</button>
    </form>
    <a href="/account/login">Have an account? Login here</a>
</section>

<style>
    .signup-section{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        padding: 1rem 0;
    }

    .signup-section > form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
    }

    .signup-section > h2{
        text-align: center;
        font-size: 24pt;
        padding: 0 0 0.8rem 0;
    }

    .signup-section > a{
        color: var(--rich-black);
        text-decoration: none;
        text-align: center;
        margin: 0.4rem 0;
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

    .error-msg{
        text-align: center;
        padding: 1rem 0;
        font-size: 14pt;
        color: var(--light-red);
        text-decoration: underline;
    }
</style>