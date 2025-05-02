import { cookies } from 'next/headers';
import { connectToDB } from '@/libs/mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  const token = (await cookies()).get('authToken')?.value;

  if (!token) {
    return NextResponse.json({ isValid: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const { db } = await connectToDB();

    const { currentPassword } = await req.json();

    const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });

    if (!user || !user.password) {
      return NextResponse.json({ isValid: false, message: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    return NextResponse.json({ isValid: isMatch });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error verifying current password:', error);
    return NextResponse.json({ isValid: false, message: 'Error verifying password' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const token = (await cookies()).get('authToken')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const { db } = await connectToDB();

    const { currentPassword, newPassword } = await req.json();

    const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Current password is incorrect' }, { status: 400 });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return NextResponse.json({
        message: 'New password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.',
      }, { status: 400 });
    }

    if (currentPassword === newPassword) {
      return NextResponse.json({ message: 'New password cannot be the same as the current password.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await db.collection('users').updateOne(
      { _id: new ObjectId(decoded.userId) },
      { $set: { password: hashedPassword } }
    );

    return NextResponse.json({ message: 'Password changed successfully!' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error changing password:', error); // Log for debugging
    return NextResponse.json({ message: 'Error changing password', error: error.message }, { status: 500 });
  }
}
