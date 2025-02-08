import { connectMongoDB } from "@/lib/mongodb";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const db = await connectMongoDB();
        const enquiriesCollection = db.collection("enquiries");

        const newEnquiry = { name, email, message, createdAt: new Date() };
        await enquiriesCollection.insertOne(newEnquiry);

        return res.status(201).json({ message: "Enquiry submitted successfully." });
    } catch (error) {
        console.error("Error saving enquiry:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}