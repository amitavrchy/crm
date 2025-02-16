import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    console.log("➡️ Register API Called"); // Debugging log

    const body = await req.json();
    console.log("📩 Received data:", body);

    const { username, email, password, userType } = body;

    if (!username || !email || !password) {
      console.log("❌ Missing Fields");
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    const db = await connectMongoDB(); // ✅ Fix connection
    console.log("✅ Connected to MongoDB");

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists");
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Password hashed");

    // Insert user
    const result = await db.collection("users").insertOne({
      username,
      email,
      password: hashedPassword,
      userType: userType || "Client",
      createdAt: new Date(),
    });

    console.log("✅ User inserted:", result);

    if (!result.acknowledged) {
      throw new Error("Failed to insert user");
    }

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return new Response(JSON.stringify({ message: "Something went wrong", error: error.message }), { status: 500 });
  }
}
