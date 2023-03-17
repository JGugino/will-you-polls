import { loginUser } from '$db/user_helper';
import { createBasicJSONMessage } from '$lib/scripts/message_helper';

export async function POST({request}){
    const requestJSON = await request.json();

    if(!requestJSON || !requestJSON.username || !requestJSON.password){
        return new Response(createBasicJSONMessage(400, {message: 'invaild-request'}));
    }

    const loggedInUser = await loginUser(requestJSON.username, requestJSON.password);

    //TODO:
    //Check if username exists
    //Check if password matches password in database
    //generate tokens and fingerprints
    //add hashed fingerprint to tokens data
    //set headers for auth and fingerprint
    //set cookie for fingerprint

    return new Response(createBasicJSONMessage(200, {}));
}