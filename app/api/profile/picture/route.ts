import { cookies } from 'next/headers';
import { connectToDB } from '@/libs/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Retrieve the auth token from cookies
  const token = (await cookies()).get('authToken')?.value;
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    // Decode the token to get user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    
    // Get profile picture data from the request body
    const { profilePicture } = await req.json();

    if (!profilePicture) {
      return NextResponse.json({ message: 'No profile picture provided' }, { status: 400 });
    }

    // Connect to DB
    const { db } = await connectToDB();

    // Update the user's profile picture in the database
    const updateResult = await db.collection('users').updateOne(
      { _id: new ObjectId(decoded.userId) },
      { $set: { profilePicture } }
    );

    // Handle the case where no document was updated
    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ message: 'User not found or picture not updated' }, { status: 404 });
    }

    // Fetch the updated user data
    const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });

    // Return the updated user data in the response
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return NextResponse.json({ message: 'Error uploading picture', error: error instanceof Error ? error.message : error }, { status: 500 });
  }
}
