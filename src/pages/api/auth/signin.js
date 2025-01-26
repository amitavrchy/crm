import { connectMongoDB } from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import validator from "validator";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const client = await connectMongoDB();
    const db = client.db();

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
