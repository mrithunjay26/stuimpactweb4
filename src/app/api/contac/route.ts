import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://mrithunjay26:77820897@comments.jx9xmpc.mongodb.net/"; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        await client.connect();
        const database = client.db("stuimpact");
        const collection = database.collection("contacts");

        await collection.insertOne({ name, email, message, date: new Date() });

        return NextResponse.json({ message: "Contact information saved successfully" }, { status: 200 });
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ message: "Error saving contact information" }, { status: 500 });
    } finally {
        await client.close(); // Ensure the client is closed after the operation
    }
}