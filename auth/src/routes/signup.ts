import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import {
	validateRequest,
	BadRequestError,
	RequestValidationError,
} from "@dwtickets/common";

const router = express.Router();

router.post(
	"/api/users/signup",
	[
		body("email").isEmail().withMessage("Invalid Email"),
		body("password")
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage("Password must be between 4 and 20 characters"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const exitingUser = await User.findOne({ email });

		if (exitingUser) {
			throw new BadRequestError("Email in use");
		}

		const user = User.build({ email, password });
		await user.save();

		//Generate JWT

		const userJwt = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			process.env.JWT_KEY!
		);
		// The ! sign is telling TypeScript that we gaurantee that if the application reaches this point JWT_KEY will be defined.
		// This garantee is taken care of in the index.ts file.

		//Store JWT on Sessio Object
		req.session = {
			jwt: userJwt,
		};

		res.status(201).send(user);
	}
);

export { router as signupRouter };
