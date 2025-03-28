import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB connection details (hardcoded for testing)
const uri = 'mongodb+srv://mrithunjay26:77820897@comments.jx9xmpc.mongodb.net/'; // Replace with your MongoDB connection string

// Handle POST requests
export async function POST(req: Request) {
    const client = new MongoClient(uri);

    try {
        const body = await req.json();
        let { interest, grade, page = 1 } = body; // Default to page 1 if not provided

        if (!interest || !grade) {
            return NextResponse.json({ error: 'Interest and grade are required.' }, { status: 400 });
        }

        // Convert grades to uppercase word form if necessary
        const gradeMap: { [key: string]: string } = {
            '9': 'FRESHMEN',
            '10': 'SOPHOMORES',
            '11': 'JUNIORS',
            '12': 'SENIORS',
        };
        grade = gradeMap[grade] || grade.toUpperCase();

        // Supported interests (uppercase as required in the tags)
        const interests = [
            'BIOLOGY', 'COMPUTER SCIENCE', 'ENVIRONMENTAL SCIENCE', 'ENGINEERING', 'MEDICAL',
            'CHEMISTRY', 'ARTS PERFORMANCE', 'MATHEMATICS', 'ENGLISH LITERATURE WRITING', 'GENERAL',
            'PUBLIC ADMINISTRATION', 'DATA SCIENCE', 'POLITICAL SCIENCE', 'LAW', 'PHYSICS',
            'BUSINESS', 'PSYCHOLOGY', 'KINESIOLOGY', 'PHILOSOPHY'
        ];

        // Validate interest and grade
        if (!interests.includes(interest.toUpperCase()) || !Object.values(gradeMap).includes(grade)) {
            return NextResponse.json({ error: 'Invalid interest or grade.' }, { status: 400 });
        }

        // Connect to MongoDB
        await client.connect();
        const db = client.db('extracurriculars'); // Replace with your database name
        const collection = db.collection('programs'); // Replace with your collection name

        // Build the query based on interest and grade
        const query = {
            $and: [
                { tags: interest.toUpperCase() },
                { tags: grade.toUpperCase() }
            ]
        };

        // Fetch the matching documents (pagination applied)
        const opportunities = await collection
            .find(query)
            .skip((page - 1) * 10)
            .limit(10)
            .toArray();

        // Return the opportunities found
        return NextResponse.json({ opportunities }, { status: 200 });
    } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    } finally {
        // Close the client connection
        await client.close();
    }
}
