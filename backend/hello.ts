import { Context, Router } from "@oak/oak";

export function hello(ctx: Context) {
	ctx.response.body = JSON.stringify({
		text: "Hello from the backend!",
		otherText: "Hello again!",
	});
}

export default function (router: Router) {
	router.get("/api/hello", hello);
}
