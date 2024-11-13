import { testing } from "@oak/oak";
import { hello } from "./hello.ts";
import { assertEquals } from "@std/assert/equals";

Deno.test({
	name: "hello test",
	fn() {
		const ctx = testing.createMockContext({
			path: "/hello",
		});
		hello(ctx);
		assertEquals(ctx.response.body, "Hello world");
	},
});
