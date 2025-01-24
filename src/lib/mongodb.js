import { MongoClient } from "mongodb";
require('dotenv').config();

let client;
let clientPromise;

export const connectMongoDB = async () => {
  try {
    if (!client) {
      console.log("Initializing MongoDB connection...");
      client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      clientPromise = client.connect();
      console.log("MongoDB connected successfully"); // This message should appear
    }
    return await clientPromise;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw new Error("Could not connect to MongoDB");
  }
};
