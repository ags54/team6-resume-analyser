import { Context, Router } from "@oak/oak";

export function hello(ctx: Context) {
	ctx.response.body = JSON.stringify({
		message: "Hello from the backend!",
	});
}

export async function greeting(ctx: Context) {
	const request = await ctx.request.body.json();
	ctx.response.body = JSON.stringify({
		message: `Hello, ${request.name}`,
	});
}

export default function (router: Router) {
	router.get("/api/hello", hello).post("/api/greeting", greeting);
}
