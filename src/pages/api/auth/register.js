import { connectMongoDB } from "../../../lib/mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { username, email, password, userType } = req.body;

  // Validate input fields
  if (!username || !email || !password || !userType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Connect to MongoDB
    const client = await connectMongoDB();
    const db = client.db();

    // Check if the user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    await db.collection("users").insertOne({
      username,
      email,
      password: hashedPassword,
      userType,
      createdAt: new Date(),
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
