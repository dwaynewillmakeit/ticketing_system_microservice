import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

//Tell TypeScript ablout the global function we declared for testing called signup()
declare global {
	namespace NodeJS {
		interface Global {
			signin(): Promise<string[]>;
		}
	}
}
// declare global {
//     var signin: () => Promise<string[]>;
//   }

let mongo: any;
//This is a Hook that will run before all of our test
beforeAll(async () => {
	process.env.JWT_KEY = "dtyujnbvf";

	mongo = new MongoMemoryServer();
	const mongoUri = await mongo.getUri();

	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
});

//This is a hook that runs before each of our test
beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

//This is a Hook that runs after all our test have ran
afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

//Declaring a global signup() so that it can be reused for our various tests
global.signin = async () => {
	const email = "test@test.com";
	const password = "password";

	const response = await request(app)
		.post("/api/users/signup")
		.send({
			email,
			password,
		})
		.expect(201);

	const cookie = response.get("Set-Cookie");

	return cookie;
};
