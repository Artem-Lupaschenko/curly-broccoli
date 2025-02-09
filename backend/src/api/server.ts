import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { onError } from "./hooks/on-error";
import { configPlugin } from "./plugins/config";
import { contextPlugin } from "./plugins/context";
import { accessesRoute } from "./routes/accesses";
import { imagesRoute } from "./routes/images";
import { pingRoute } from "./routes/ping";
import { usersRoute } from "./routes/users";

export const app = new Elysia()
	.onError(({ error, set }) => {
		return onError(error as Error, set);
	})
	.use(cors()) // FIXME: bad approach, pls change
	.use(
		swagger({
			path: "doc",
			documentation: {
				info: {
					title: "API Documentation",
					version: "0.0.0",
				},
				tags: [
					{ name: "Accesses" },
					{ name: "Users" },
					{ name: "Ping" },
					{ name: "Images" },
				],
			},
		}),
	)
	.use(configPlugin)
	.use(contextPlugin)
	.use(pingRoute)
	.use(usersRoute)
	.use(accessesRoute)
	.use(imagesRoute)
	.listen({ port: process.env.APP_PORT }, () =>
		console.log(`🦊 Elysia is running at :${process.env.APP_PORT}`),
	);
