import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import sha256 from 'sha256';
import crypto from 'crypto'

export const generateJWT = (data, secret, expire) => jwt.sign(data, secret, {expiresIn: `${expire}`});

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

export function validateTokens(){

}