import { Database, PostgresConnector } from "https://deno.land/x/denodb@v1.2.0/mod.ts";

import PollModel from "./models/PollModel.ts";

const connection = new PostgresConnector({
    host: Deno.env.get('DB_HOST') as string,
    port: Deno.env.get('DB_PORT') as unknown as number,
    username: Deno.env.get('DB_USER') as string,
    password: Deno.env.get('DB_PASS') as string,
    database: Deno.env.get('DB_DATABASE') as string,
});
  
const database = new Database(connection);
  
database.link([PollModel]);

export default database;