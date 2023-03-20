import { createNewUser } from '$db/user_helper';
import { generateAuthPackage, storeNewRefreshToken } from '$db/token_helper';
import { createBasicJSONMessage } from '$lib/scripts/message_helper';
import { REFRESH_TOKEN_SECRET, AUTH_TOKEN_SECRET } from '$env/static/private';

export async function POST({request, setHeaders, cookies}){
    const requestJSON = await request.json();

    if(!requestJSON || !requestJSON.firstName || !requestJSON.lastName 
        || !requestJSON.username || !requestJSON.email || !requestJSON.password || !requestJSON.passwordConfirm){
        return new Response(createBasicJSONMessage(400, {message: 'invaild-request'}));
    }

    const createdUser = await createNewUser(requestJSON.firstName, requestJSON.lastName, requestJSON.username, requestJSON.email, requestJSON.password, requestJSON.passwordConfirm);

    if(createdUser.status == 'error'){
        return new Response(createBasicJSONMessage(400, {message: createdUser.message}));
    }

    const authPackage = await generateAuthPackage(createdUser.data[0].uuid, createdUser.data[0].username, [REFRESH_TOKEN_SECRET, AUTH_TOKEN_SECRET], ['40m', '15m']);

    await storeNewRefreshToken(createdUser.data[0].uuid, authPackage.refreshToken);

    setHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authentication": `Bearer:${authPackage.authToken}:${authPackage.refreshToken}`
    });

    cookies.set('print', authPackage.fingerprint, {path: '/', httpOnly: true, sameSite: 'strict', secure: true});

    return new Response(createBasicJSONMessage(200, {message: createdUser.message, data: createdUser.data[0]}));
}