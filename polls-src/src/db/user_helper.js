import bcrypt from 'bcrypt'

import { sql } from "./postgres_connect";


const passwordMinLength = 12;
const usernameMaxLength = 60;

export async function createNewUser(firstName, lastName, username, email, password, passwordConfirm){
    if(firstName.length <= 0) return { status: 'error', message: 'first-name-required' };
    if(lastName.length <= 0) return { status: 'error', message: 'last-name-required' };
    if(username.length <= 0) return { status: 'error', message: 'username-required' };
    if(email.length <= 0) return { status: 'error', message: 'email-required' };
    if(password.length <= 0) return { status: 'error', message: 'password-required' };
    if(passwordConfirm.length <= 0) return { status: 'error', message: 'password-confirm-required' };

    if(password !== passwordConfirm) return { status: 'error', message: 'passwords-dont-match' }
    if(password.length < passwordMinLength) return { status: 'error', message: 'password-too-short' }
    if(username.length > usernameMaxLength) return { status: 'error', message: 'username-too-long' }

    if(await usernameTaken(username)) return { status: 'error', message: 'username-taken'}
    if(await emailTaken(email)) return { status: 'error', message: 'email-taken'}

    const passSalt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, passSalt);

    const createdUser = await sql`
            insert into users
                (first_name, last_name, username, email, password)
            values
                (${firstName}, ${lastName}, ${username}, ${email}, ${hashedPass})

            returning uuid, username
        `
    return {status: 'ok', message: 'user-created', data: createdUser};
}

export async function loginUser(username, password){
    const foundUser = await findUserByUsername(username);

    if(!foundUser) return { status: 'error', message: 'no-user' }

    const passwordValid = await validateUserPassword(password, foundUser.data.password);

    if(passwordValid.message != 'password-valid') return { status: 'error', message: 'invalid-password' }

}

export async function deleteUser(uuid){
    await sql`
        delete from users where uuid = ${uuid}
    `
    return {status: 'ok', message: 'user-deleted'};
}

export async function findUserByEmail(email){
    const foundEmail = await sql`
        select * from users where email = ${email}
        returning uuid, username
    `
    return {status: 'ok', message: 'user-found', data: foundEmail[0]};
}

export async function findUserByUsername(username){
    const foundUsername = await sql`
        select * from users where username = ${username}
    `
    return {status: 'ok', message: 'user-found', data: foundUsername[0]};
}

export async function usernameTaken(username){
    const foundUsers = await sql`
        select * from users where username = ${username}
    `;

    return foundUsers.length <= 0 ? false : true;
}

export async function emailTaken(email){
    const foundEmails = await sql`
        select * from users where email = ${email}
    `;

    return foundEmails.length <= 0 ? false : true;
}

export async function validateUserPassword(givenPassword, storedPassword){
    await bcrypt.compare(givenPassword, storedPassword, async (err, response)=>{
        if(response){
            return { status: 'ok', message: 'password-valid' };
        }
        return { status: 'error', message: 'invalid-password', error: err };
    });
}