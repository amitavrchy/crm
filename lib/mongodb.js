import { MongoClient } from "mongodb";

let client;
let clientPromise;

export const connectMongoDB = async () => {
  try {
    if (!client) {

      client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });


      clientPromise = client.connect();
      console.log("MongoDB connected successfully");
    }


    return await clientPromise;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Could not connect to MongoDB");
  }
};
