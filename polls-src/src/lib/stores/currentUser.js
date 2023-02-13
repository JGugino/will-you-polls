import { writable } from 'svelte/store';

export const currentUser = writable(
    {
        loggedIn: false,
        uuid: 'none',
        username: 'none'
    }
);