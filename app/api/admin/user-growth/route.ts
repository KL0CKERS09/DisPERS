import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB URI from environment variables
const uri = process.env.MONGODB_URI_ALERT!;
const client = new MongoClient(uri);
const dbName = 'safeNetDb'; 
const collectionName = 'users';

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
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
        },
      },
    ];

    const results = await collection.aggregate(pipeline).toArray();

    // Format the results into an array with all months
    const formatted = Array.from({ length: 12 }, (_, i) => {
      const monthData = results.find(r => r._id.month === i + 1);
      return {
        month: new Date(0, i).toLocaleString('default', { month: 'short' }),
        users: monthData ? monthData.count : 0,
      };
    });

    return NextResponse.json(formatted);
  } catch (err) {
    console.error('Error fetching user growth data:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
