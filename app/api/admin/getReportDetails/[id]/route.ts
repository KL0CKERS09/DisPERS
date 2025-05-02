import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDB } from "@/libs/mongodb";

// Update the function to match the new API route structure
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params; // Extract the dynamic parameter

  // Validate the ID format
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const db = await connectToDB();
    const reportsCollection = db.collection("reports");
    const usersCollection = db.collection("users");

    // Fetch the report from the reports collection
    const report = await reportsCollection.findOne({ _id: new ObjectId(id) });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Fetch the user associated with the report, if the userId exists
    let user = null;
    if (report.userId && ObjectId.isValid(report.userId)) {
      user = await usersCollection.findOne({ _id: new ObjectId(report.userId) });
    }

    // Prepare the response data
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
    console.error("Error fetching report details:", error); // Detailed logging
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
