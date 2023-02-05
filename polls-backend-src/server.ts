import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import pollRouter from "./routes/poll_routes.ts";
import database from "./db_connect.ts"

const app = new Application();
const port = 8000;

app.use(pollRouter.prefix('/api/polls').routes());
app.use(pollRouter.allowedMethods())

await database.sync();

console.log(`Connected to database`);

console.log(`Server running on port ${port}`);

await app.listen({ port });