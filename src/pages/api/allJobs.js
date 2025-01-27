import { connectMongoDB } from "@/lib/mongodb";

export default async function handler(req, res) {
    if (req.method === "GET") {
      try {
        const { db } = await connectMongoDB();
        const jobs = await db.collection("jobs").find().toArray();
        res.status(200).json(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Internal Server Error." });
      }
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
