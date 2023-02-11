export function createBasicJSONMessage(status, body){
    return JSON.stringify({status, body})
}