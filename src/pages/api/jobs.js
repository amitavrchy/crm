import { connectMongoDB } from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Request body:", req.body); // Debugging

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
    if (
      !title ||
      !company ||
      !location ||
      !jobType ||
      !category ||
      !description ||
      !jobReference ||
      !vacancy
    ) {
      return res.status(400).json({ message: "Please fill out all required fields!" });
    }

    try {
      const { db } = await connectMongoDB();

      const result = await db.collection("jobs").insertOne({
        title,
        company,
        location,
        jobType,
        category,
        description,
        salary: salary || null, // Optional field
        jobReference,
        vacancy: parseInt(vacancy, 10), // Ensure vacancy is stored as a number
        featured: Boolean(featured), // Ensure featured is a boolean
        postedAt: new Date(),
      });

      res.status(201).json({
        message: "Job posted successfully!",
        jobId: result.insertedId,
      });
    } catch (error) {
      console.error("Error posting job:", error.message);
      res.status(500).json({ message: "Internal Server Error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
