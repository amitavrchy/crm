import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { username, email, password, userType } = await req.json();

    if (!username || !email || !password) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    const { db } = await connectMongoDB();

    // Check if the user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      email,
      password: hashedPassword,
      userType: userType || "Client",
      createdAt: new Date(),
    };

    // Insert user
    const result = await db.collection("users").insertOne(newUser);

    if (!result.acknowledged) {
      throw new Error("Failed to insert user");
    }

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return new Response(JSON.stringify({ message: "Something went wrong", error: error.message }), { status: 500 });
  }
}
