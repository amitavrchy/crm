import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const db = await connectMongoDB();
    const jobsCollection = db.collection("jobManagementVendor");

    if (req.method === "POST") {
        try {
            const { title, description, vendor, category, priority, location, salary } = req.body;
            if (!title || !description || !vendor || !category || !priority || !location || !salary) {
                return res.status(400).json({ error: "All fields are required." });
            }

            const newJob = {
                title,
                description,
                vendor,
                employee: null,
                createdAt: new Date(),
                status: "Pending",
                category,
                priority,
                location,
                salary
            };

            const result = await jobsCollection.insertOne(newJob);
            return res.status(201).json({ message: "Job created successfully", job: newJob });
        } catch (error) {
            return res.status(500).json({ error: "Failed to create job." });
        }
    }

    if (req.method === "GET") {
        try {
            const jobs = await jobsCollection.find({}).toArray();
            return res.status(200).json(jobs);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch jobs." });
        }
    }

    if (req.method === "PUT") {
        try {
            const { id, employee, status, category, priority, location, salary } = req.body;
            if (!id) return res.status(400).json({ error: "Job ID is required." });

            const updateFields = {};
            if (employee !== undefined) updateFields.employee = employee;
            if (status !== undefined) updateFields.status = status;
            if (category !== undefined) updateFields.category = category;
            if (priority !== undefined) updateFields.priority = priority;
            if (location !== undefined) updateFields.location = location;
            if (salary !== undefined) updateFields.salary = salary;

            await jobsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateFields }
            );
            return res.status(200).json({ message: "Job updated successfully." });
        } catch (error) {
            return res.status(500).json({ error: "Failed to update job." });
        }
    }

    if (req.method === "DELETE") {
        try {
            const { id } = req.body;
            if (!id) return res.status(400).json({ error: "Job ID is required." });

            await jobsCollection.deleteOne({ _id: new ObjectId(id) });
            return res.status(200).json({ message: "Job deleted successfully." });
        } catch (error) {
            return res.status(500).json({ error: "Failed to delete job." });
        }
    }

    return res.status(405).json({ error: "Method not allowed." });
}
