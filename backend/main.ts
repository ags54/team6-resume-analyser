import { Application } from "@oak/oak";
import { router } from "./routes.ts";

if (import.meta.main) {
	const app = new Application();
	app.use(router.routes());
	app.use(router.allowedMethods());

	const port = 3001;
	console.log(`listening on port ${port}`);
	app.listen({
		port,
	});
}
