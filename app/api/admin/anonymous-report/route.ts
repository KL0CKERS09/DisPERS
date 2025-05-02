import { connectToDB } from '@/libs/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { db } = await connectToDB();
    const reports = await db
      .collection('anonymousReport')
      .find()
      .sort({ createdAt: -1 })
      .toArray();

      const formattedReports = reports.map((report) => ({
        _id: report._id.toString(),
        title: report.title,
        description: report.description,
        type: report.type,
        location: report.location,
        email: report.email,
        image: report.image || '',
        createdAt: report.createdAt?.toISOString() || '',
        updatedAt: report.updatedAt?.toISOString() || '',
        status: report.status || 'Pending', // 👈 Add this line
      }));
      

    return NextResponse.json({ reports: formattedReports });
  } catch (error) {
    console.error("Error fetching anonymous reports:", error);
    return NextResponse.json({ message: 'Error fetching anonymous reports' }, { status: 500 });
  }
}
