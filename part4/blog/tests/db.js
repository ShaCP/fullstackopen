import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongodb = await MongoMemoryServer.create();

const connect = async () => {
  const uri = mongodb.getUri();
  await mongoose.connect(uri);
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongodb.stop();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export default { connect, closeDatabase, clearDatabase };
