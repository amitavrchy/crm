import { connectMongoDB } from "../../../lib/mongodb";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        console.error("❌ Missing email or password");
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        console.log("🔄 Connecting to MongoDB...");
        const db = await connectMongoDB();
        console.log("✅ Connected to MongoDB");

        console.log("🔎 Searching for user with email:", email);

        const user = await db.collection("users").findOne({ email });

        if (!user) {
            console.error("❌ User not found:", email);
            return res.status(401).json({ message: "Invalid email or password" });
        }

        console.log("✅ User found:", user);

        console.log("🔍 Checking password...");
        console.log("Entered Password:", password);
        console.log("Stored Password:", user.password); // This should match exactly

        if (password !== user.password) {
            console.error("❌ Incorrect password for:", email);
            return res.status(401).json({ message: "Invalid email or password" });
        }

        console.log("✅ Login successful for:", email);

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
        console.error("❌ Sign-in Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
