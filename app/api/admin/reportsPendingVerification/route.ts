import { NextResponse } from 'next/server';
import { connectToDB } from '@/libs/mongodb';
import { ObjectId } from 'mongodb';

// Define the Report type
interface Report {
  _id: { toString: () => string };
  userId: string;
  status: string;
  title: string;
  category: string;
  severity: string;
  location: string;
  createdAt?: string;
}

export async function GET() {
  try {
    const db = await connectToDB();
    const reportsCollection = db.collection('reports');
    const usersCollection = db.collection('users');

    const reports: Report[] = await reportsCollection.find({}).toArray();

    const results = await Promise.all(
      reports.map(async (report) => {
        // Ensure ObjectId is valid
        const userId = report.userId ? new ObjectId(report.userId) : null;

        // Fetch user data if userId exists
        const user = userId ? await usersCollection.findOne({ _id: userId }) : null;

        return {
          id: report._id.toString(),
          status: report.status,
          title: report.title,
          category: report.category,
          severity: report.severity,
          location: report.location,
          createdAt: report.createdAt ? new Date(report.createdAt).toISOString() : new Date().toISOString(),
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
