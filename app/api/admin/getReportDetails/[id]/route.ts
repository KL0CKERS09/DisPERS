// app/api/admin/getReportDetails/[id]/route.ts
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDB } from "@/libs/mongodb";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const db = await connectToDB();
    const reportsCollection = db.collection("reports");
    const usersCollection = db.collection("users");

    const report = await reportsCollection.findOne({ _id: new ObjectId(id) });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const user = await usersCollection.findOne({ _id: new ObjectId(report.userId) });

    const responseData = {
      ...report,
      _id: report._id.toString(),
      createdAt: report.createdAt || new Date().toISOString(),
      user: user
        ? {
            username: user.username,
            profilePicture: user.profilePicture || null,
          }
        : undefined,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching report details:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
