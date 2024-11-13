import { Context, Router } from "@oak/oak";

export function hello(ctx: Context) {
	ctx.response.body = "Hello world";
}

export default function (router: Router) {
	router.get("/hello", hello);
}
