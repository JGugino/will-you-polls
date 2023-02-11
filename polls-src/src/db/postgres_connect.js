import postgres from 'postgres';
import { dev } from '$app/environment';
import {PROD_HOST, PROD_PORT, PROD_DATABASE, PROD_USER, PROD_PASSWORD, DEV_HOST, DEV_PORT, DEV_DATABASE, DEV_USER, DEV_PASSWORD} from '$env/static/private'; 

export let sql;

const prod_options = {
    host: PROD_HOST,
    port: PROD_PORT,
    database: PROD_DATABASE,
    username: PROD_USER,
    password: PROD_PASSWORD,
    ssl: true
}

const dev_options = {
    host: DEV_HOST,
    port: DEV_PORT,
    database: DEV_DATABASE,
    username: DEV_USER,
    password: DEV_PASSWORD,
}

export function connectPostgres(){
    console.log('Connecting to database...');
    sql = postgres(dev ? dev_options : prod_options); 
}