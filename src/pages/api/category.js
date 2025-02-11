import { connectMongoDB } from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { categoryName, description, department, priorityLevel, isActive } = req.body;

      if (!categoryName.trim()) {
        return res.status(400).json({ error: "Category name is required." });
      }

      const db = await connectMongoDB();
      const result = await db.collection("jobCategories").insertOne({
        categoryName,
        description: description?.trim() || "",
        department: department?.trim() || "",
        priorityLevel: priorityLevel?.trim() || "",
        isActive: Boolean(isActive),
        createdAt: new Date(),
      });

      return res.status(201).json({
        message: "Category created successfully!",
        data: result,
      });
    } catch (error) {
      console.error("Error creating category:", error);
      return res.status(500).json({ error: "Failed to create category." });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}