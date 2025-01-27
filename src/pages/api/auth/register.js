import { connectMongoDB } from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import validator from "validator";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { username, email, password, userType } = req.body;

  if (!username || !email || !password || !userType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Enforce password policy
  if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long and include a number and a special character",
    });
  }

  try {
    const client = await connectMongoDB();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      username,
      email,
      password: hashedPassword,
      userType,
      createdAt: new Date(),
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
