// app/api/registrations/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDB } from '@/libs/mongodb';

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = params;

  try {
    // Parse the incoming JSON body
    const { status } = await req.json();

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
    console.error('Error updating registration:', error);
    return NextResponse.json({ message: 'Failed to update status' }, { status: 500 });
  }
}
