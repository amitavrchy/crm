import crypto from "crypto";
import { connectMongoDB } from "../../../lib/mongodb";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const db = await connectMongoDB();
        const user = await db.collection("users").findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate a secure random session token
        const sessionToken = crypto.randomBytes(32).toString("hex");

        // Store the session token in the database
        await db.collection("sessions").insertOne({
            userId: user._id,
            token: sessionToken,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Expires in 7 days
        });

        return res.status(200).json({
            message: "Login successful",
            token: sessionToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                userType: user.userType,
            },
        });

    } catch (error) {
        console.error("❌ Sign-in Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
