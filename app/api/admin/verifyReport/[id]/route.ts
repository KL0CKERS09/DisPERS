import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDB } from "@/libs/mongodb";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Resolve the params Promise to get the id
  const { id } = await context.params;

  // Validate ObjectId format
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    // Connect to the database
    const { db } = await connectToDB();

    // Update the report status to "Resolved"
    const result = await db.collection("reports").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "Resolved" } }
    );

    // Handle the case where no report is found
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Return a success message if the report is updated
    return NextResponse.json({ message: "Report verified successfully" });
  } catch (error) {
    // Log the error and return a server error response
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
