import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler, NotFoundError } from "@dwtickets/common";

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

// app.get('/api/users/currentuser',(req,res)=>{
//     console.log('Signing up user');
//     res.send('Hi there!')
// });
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
