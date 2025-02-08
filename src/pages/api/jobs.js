import { connectMongoDB } from "@/lib/mongodb";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const db = await connectMongoDB();
            const jobs = await db.collection("jobs").find().toArray();
            return res.status(200).json(jobs);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            return res.status(500).json({ message: "Internal Server Error." });
        }
    }

    if (req.method === "POST") {
        try {
            const {
                title,
                company,
                location,
                jobType,
                category,
                description,
                salary,
                jobReference,
                vacancy,
                featured,
            } = req.body;

            // Validate required fields
            if (!title || !company || !location || !jobType || !category || !description || !jobReference || !vacancy) {
                return res.status(400).json({ message: "Please fill out all required fields!" });
            }

            // Ensure vacancy is a number
            const parsedVacancy = parseInt(vacancy, 10);
            if (isNaN(parsedVacancy) || parsedVacancy < 1) {
                return res.status(400).json({ message: "Vacancy must be a positive number." });
            }

            const db = await connectMongoDB();
            const result = await db.collection("jobs").insertOne({
                title,
                company,
                location,
                jobType,
                category,
                description,
                salary: salary ? Number(salary) : null,
                jobReference,
                vacancy: parsedVacancy,
                featured: Boolean(featured),
                postedAt: new Date(),
            });

            return res.status(201).json({
                message: "Job posted successfully!",
                jobId: result.insertedId,
            });
        } catch (error) {
            console.error("Error posting job:", error);
            return res.status(500).json({ message: "Internal Server Error." });
        }
    }

    // If the method is neither GET nor POST
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
