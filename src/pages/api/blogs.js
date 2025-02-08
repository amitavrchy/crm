import { connectMongoDB } from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const db = await connectMongoDB();
    const blogs = await db.collection("blogs").find({}).toArray();

    return res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ error: "Failed to fetch blogs" });
  }
}
