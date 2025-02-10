import { connectMongoDB } from "@/lib/mongodb";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { vendorName, clientName, vendorEmail, clientEmail, phone, additionalInfo, meetingDate, meetingTime } = req.body;

        if (!vendorName || !clientName || !vendorEmail || !clientEmail || !phone || !meetingDate || !meetingTime) {
            return res.status(400).json({ error: "All required fields must be filled." });
        }

        const db = await connectMongoDB();
        const result = await db.collection("vendorClientMeetings").insertOne({
            vendorName,
            clientName,
            vendorEmail,
            clientEmail,
            phone,
            additionalInfo,
            meetingDate: new Date(meetingDate),
            meetingTime,
            createdAt: new Date(),
        });

        return res.status(201).json({ message: "Meeting scheduled successfully", data: result });
    } catch (error) {
        console.error("Error scheduling meeting:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}