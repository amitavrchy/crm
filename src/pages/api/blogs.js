import { connectMongoDB } from "@/lib/mongodb";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const db = await connectMongoDB();
            const blogs = await db.collection("blogs").find().toArray();
            return res.status(200).json(blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            return res.status(500).json({ message: "Internal Server Error." });
        }
    }

    if (req.method === "POST") {
        try {
            const { title, author, category, content, image, date_published } = req.body;

            // Validate required fields
            if (!title || !author || !category || !content || !image || !date_published) {
                return res.status(400).json({ message: "All fields are required!" });
            }

            // Validate date format
            const parsedDate = new Date(date_published);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).json({ message: "Invalid date format!" });
            }

            const db = await connectMongoDB();
            const result = await db.collection("blogs").insertOne({
                title,
                author,
                category,
                content,
                image,
                date_published: parsedDate,
                createdAt: new Date(),
            });

            return res.status(201).json({
                message: "Blog posted successfully!",
                blogId: result.insertedId,
            });
        } catch (error) {
            console.error("Error posting blog:", error);
            return res.status(500).json({ message: "Internal Server Error." });
        }
    }

    // If the method is neither GET nor POST
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
