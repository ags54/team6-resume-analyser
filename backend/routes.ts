import { Router } from "@oak/oak/router";
import hello from "./hello.ts";

export const router = new Router();

hello(router);
