import { NextResponse } from 'next/server';
import { connectToDB } from "@/libs/mongodb";
import User from '../../../models/login';
import { AuthenticatedRequest } from '../../../libs/auth';

export async function GET(req: AuthenticatedRequest) {
  await connectToDB();

  // Apply the authenticate middleware
  const userId = req.userId; // Access the userId from the request after authentication
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const user = await User.findById(userId).lean();

  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

  return NextResponse.json(user);
}
