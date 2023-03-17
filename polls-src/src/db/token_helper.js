import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import sha256 from 'sha256';
import crypto from 'crypto'
import { sql } from "./postgres_connect";

export const generateJWT = async (data, secret, expire) => await jwt.sign(data, secret, {expiresIn: `${expire}`});

export async function generateFingerprint(){
    const fingerprintSalt = await bcrypt.genSalt();
    const fingerprint = await sha256(crypto.randomBytes(64).toString());
    const hashedFingerprint = bcrypt.hash(fingerprint, fingerprintSalt);

    return { fingerprint, hashedFingerprint }
}

export async function getUUIDFromToken(token, secret){
    const { uuid } = await jwt.verify(token, secret);
    return uuid
}

export async function refreshTokenExists(uuid){
    if(!uuid) return { status: 'error', message: 'invalid-request'};

    const foundToken = await sql`
        select 
            token 
        from
            user_tokens
        where
            user_uuid = ${uuid}
    `;

    return foundToken? true : false;
}

export async function retrieveStoredRefreshToken(uuid){
    try{
        const foundToken = await sql`
            select
                token
            from
                user_tokens
            where
                user_uuid = ${uuid}
        `;

        return { status: 'ok', message: 'found-token', data: foundToken }
    }catch(error){
        return { status: 'error', message: 'no-token'}
    }
}

export async function storeNewRefreshToken(uuid, token){
    if(!uuid || !token) return { status: 'error', message: 'invalid-request'};

    try{
        const storedToken = await sql`
            insert into 
                user_tokens ( token, user_uuid )
            values (${token}, ${uuid})
            returning token, user_uuid;
        `;

        return { status: 'ok', message: 'token-created', data: storedToken }
    }catch(error){
        return { status: 'error', message: 'token-create-fail', error: error };
    }
}

export async function updateStoredRefreshToken(uuid, token){
    if(!uuid || !token) return { status: 'error', message: 'invalid-request'};

    try{
        await sql`
            update
                user_tokens
            set
                token = ${token}
            where
                user_uuid = ${uuid}
        `;
       
        return { status: 'ok', message: 'token-updated'}
    }catch(error){
        return { status: 'error', message: 'token-update-fail' };
    }
}

export async function validateToken(token, secret){
    try {
        await jwt.verify(token, secret);
        return { status: 'ok', message: 'valid-token' };
    } catch (error) {
        return { status: 'error', message: 'invalid-token' };
    }
}

export async function generateAuthPackage(uuid, username, secrets, expirations){
    if(!uuid || !username || !secrets || !expirations) return { status: 'error', message: 'invalid-request' };

    const fingerprint = await generateFingerprint();
    const currentUser = {uuid, username, fingerprint: fingerprint.hashedFingerprint};

    const refreshToken = await generateJWT(currentUser, secrets[0], expirations[0]);
    const authToken = await generateJWT(currentUser, secrets.length == 1? secrets[0]: secrets[1], expirations.length == 1? expirations[0]: expirations[1]);

    return { refreshToken, authToken, fingerprint: fingerprint.fingerprint };
}