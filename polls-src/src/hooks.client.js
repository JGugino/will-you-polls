import { currentUser } from "$lib/stores/currentUser";

if(!$currentUser.loggedIn){
    console.log('loggedIn');
}