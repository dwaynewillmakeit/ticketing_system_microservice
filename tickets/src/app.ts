import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

const app = express();

//Traffic will be proxied through Ingress. Therefore we tell Express to trust http connection through the proxy
app.set("trust proxy", true);

app.use(json());
app.use(
	cookieSession({
		signed: false,
		// secure: true
		secure: process.env.NODE_ENV !== "test",
	})
);

app.all("*", async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
