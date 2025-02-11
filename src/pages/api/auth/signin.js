import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectMongoDB } from "../../../lib/mongodb";
import { serialize } from "cookie";

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

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Set token as an HTTP-only cookie
        res.setHeader(
            "Set-Cookie",
            serialize("authToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 7 * 24 * 60 * 60, // 7 days
            })
        );

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                userType: user.userType,
            },
            token,
        });

    } catch (error) {
        console.error("❌ Sign-in Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
