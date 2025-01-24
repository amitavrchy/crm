import { connectMongoDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req) {

    const client = await connectMongoDB();
    return new NextResponse('Connected to MongoDB');

}
