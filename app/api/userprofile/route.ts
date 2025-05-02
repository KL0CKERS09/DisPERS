import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/libs/mongodb";
import User from '../../../models/login';
import { authenticate } from '../../../libs/auth';

export async function GET(req: NextRequest) {
  // Apply the authenticate middleware to get user info
  const userId = await authenticate(req);  // Assume `authenticate` is updated to return the userId
  
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  await connectToDB();

  const user = await User.findById(userId).lean();

  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

  return NextResponse.json(user);
}
