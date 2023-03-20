export class StorageHelper{
    constructor(){
        this.refreshTokenID = crypto.randomUUID();
        this.authTokenID = crypto.randomUUID();
    }

    setRefreshToken(token){
        return sessionStorage.setItem(this.refreshTokenID, token);
    }

    setAuthToken(token){
        return sessionStorage.setItem(this.authTokenID, token);
    }

    getRefreshToken(){
        return sessionStorage.getItem(this.refreshTokenID);
    }

    getAuthToken(){
        return sessionStorage.getItem(this.authTokenID);
    }
}

