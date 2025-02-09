import { MongoClient } from 'mongodb';
import { connectMongoDB } from '@/lib/mongodb';

const imageMap = {
    "Project Alpha": "/about-us/about-1.jpg",
    "Project Beta": "/about-us/about-2.jpg",
    "Project Gamma": "/about-us/about-3.jpg",
    "Project Delta": "/about-us-wte/2.jpg",
    "Project Epsilon": "/about-us-wte/3.jpg",
    "Project Zeta": "/about-us-wte/4.jpg"
};

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const db = await connectMongoDB();
            const projectsCollection = db.collection("projects");
            const projects = await projectsCollection.find({}).toArray();

            const projectsWithImages = projects.map(project => ({
                ...project,
                src: imageMap[project.name] || "/placeholder.jpg"
            }));

            return res.status(200).json(projectsWithImages);
        } catch (error) {
            console.error("Error fetching projects:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } 
    
    if (req.method === "POST") {
        try {
            const { name, location, date, status } = req.body;
            if (!name || !location || !date || !status) {
                return res.status(400).json({ message: "All fields are required." });
            }

            const db = await connectMongoDB();
            const projectsCollection = db.collection("projects");
            
            const newProject = {
                name,
                location,
                date,
                status,
                src: imageMap[name] || "/placeholder.jpg"
            };

            await projectsCollection.insertOne(newProject);
            return res.status(201).json({ message: "Project added successfully.", project: newProject });
        } catch (error) {
            console.error("Error adding project:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    return res.status(405).json({ message: "Method Not Allowed" });
}