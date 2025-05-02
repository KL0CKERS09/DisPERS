// app/api/admin/reportsPendingVerification/route.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '@/libs/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const db = await connectToDB();
    const reportsCollection = db.collection('reports');
    const usersCollection = db.collection('users');

    const reports = await reportsCollection.find({}).toArray();

    const results = await Promise.all(
      reports.map(async (report) => {
        const user = await usersCollection.findOne({ _id: new ObjectId(report.userId) });
        return {
          id: report._id.toString(),
          status: report.status,
          title: report.title,
          category: report.category,
          severity: report.severity,
          location: report.location,
          createdAt: report.createdAt || new Date().toISOString(),
          reporter: user?.username || 'Unknown',
          user: user
            ? {
                username: user.username,
                profilePicture: user.profilePicture || null,
              }
            : undefined,
        };
      })
    );

    return NextResponse.json(results.reverse());
  } catch (err) {
    console.error('Failed to fetch reports:', err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
