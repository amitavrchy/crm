import { connectMongoDB } from "../../../lib/mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { username, email, userType } = req.body;

  if (!username || !email || !userType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const db = await connectMongoDB();
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash("defaultPassword123", 10);

    await usersCollection.insertOne({
      username,
      email,
      password: hashedPassword,
      userType,
      createdAt: new Date(),
    });

    return res.status(201).json({ message: "User registered successfully. Default password: defaultPassword123" });
  } catch (error) {
    console.error("User Registration Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
