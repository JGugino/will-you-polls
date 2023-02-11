import { createNewUser } from '$db/user_helper';
import { createBasicJSONMessage } from '$lib/scripts/message_helper';

export async function POST({request}){
    const requestJSON = await request.json();

    if(!requestJSON || !requestJSON.firstName || !requestJSON.lastName 
        || !requestJSON.username || !requestJSON.email || !requestJSON.password || !requestJSON.passwordConfirm){
        return new Response(createBasicJSONMessage(400, {message: 'invaild-request'}));
    }

    const createdUser = await createNewUser(requestJSON.firstName, requestJSON.lastName, requestJSON.username, requestJSON.email, requestJSON.password, requestJSON.passwordConfirm);

    if(createdUser.status == 'error'){
        return new Response(createBasicJSONMessage(400, {message: createdUser.message}));
    }

    return new Response(createBasicJSONMessage(200, {message: createdUser.message}));
}