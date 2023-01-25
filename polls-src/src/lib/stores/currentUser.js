import { writable } from 'svelte/store';

export const currentUser = writable(
    {
        userID: crypto.randomUUID(),
        displayName: 'Gugino'
    }
);