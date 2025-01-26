import { connectMongoDB } from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Request body:", req.body); // Debugging

    const { title, company, location, description, salary } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({ message: "All fields except salary are required." });
    }

    try {
      const { db } = await connectMongoDB();
      
      const result = await db.collection("jobs").insertOne({
        title,
        company,
        location,
        description,
        salary,
        postedAt: new Date(),
      });

      res.status(201).json({ message: "Job posted successfully!", jobId: result.insertedId });
    } catch (error) {
      console.error("Error posting job:", error.message);
      res.status(500).json({ message: "Internal Server Error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
