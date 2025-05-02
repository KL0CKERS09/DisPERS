import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI_ALERT!;
const client = new MongoClient(uri);
const dbName = 'safeNetDb';
const collectionName = 'reports';

// Cache the database connection outside the function for reuse
let cachedDb: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  await client.connect();
  cachedDb = client;
  return client;
}

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const pipeline = [
      {
        $group: {
          _id: '$area', // Group by area (the report location)
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } }, // Sort by the number of reports in descending order
    ];

    const results = await collection.aggregate(pipeline).toArray();

    // Format the result to include a more readable structure
    const formatted = results.map(item => ({
      area: item._id || 'Unknown', // Default to 'Unknown' if area is missing
      reports: item.count,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error('Error fetching area report growth data:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
