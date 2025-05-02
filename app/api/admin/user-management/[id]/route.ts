import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDB } from '@/libs/mongodb';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Parse the incoming JSON body
    const { status } = await request.json();

    // Validate status
    if (!['verified', 'rejected'].includes(status)) {
      return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    // Connect to DB
    const { db } = await connectToDB();

    // Update the registration entry
    const result = await db.collection('registrations').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    // Handle case where no entry was updated
    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'Entry not found or not updated' }, { status: 404 });
    }

    // Return success response
    return NextResponse.json({ message: 'Status updated successfully' });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error updating registration:', error);

    // Return a generic error message
    return NextResponse.json(
      { message: 'Failed to update status', error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
