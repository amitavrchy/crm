import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env");
}

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true, // Enforce TLS
  tlsAllowInvalidCertificates: true, // Allow invalid certs (use only if needed)
};

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectMongoDB() {
  try {
    const client = await clientPromise;
    const db = client.db();
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw new Error("Failed to connect to MongoDB");
  }
}
