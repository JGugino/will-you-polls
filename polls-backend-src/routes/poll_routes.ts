import { Router, RouterContext } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const pollRouter = new Router();

pollRouter.get('/', (context: RouterContext<string>) =>{
    context.response.body = { message: 'Hello World' };
});

export default pollRouter;