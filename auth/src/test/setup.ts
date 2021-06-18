import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'

let mongo:any;
//This is a Hook that will run before all of our test
beforeAll(async ()=> {

    const mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri,{
        useNewUrlParser: true,
        useUnifiedTopology: true

    });
    
});

//This is a hook that runs before each of our test
beforeEach(async () =>{
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){

        await collection.deleteMany({});
    }
});


//This is a Hook that runs after all our test have ran
afterAll(async () =>{

    await mongo.stop();
    await mongoose.connection.close();
})