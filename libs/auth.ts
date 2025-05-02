import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Interface for the decoded JWT payload
interface DecodedToken {
  userId: string;
  // You can add other fields that may be present in your token
}

export async function authenticate(req: NextRequest): Promise<string | null> {
  // Get the JWT token from the Authorization header
  const token = req.headers.get('Authorization')?.split(' ')[1]; // 'Bearer <token>'

  if (!token) {
    return null; // Return null if the token is not found
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    // Return the userId if the token is valid
    return decoded.userId;
  } catch (err) {
    // Log the error for debugging purposes
    console.error('Token verification failed:', err);
    return null; // Return null if the token is invalid or expired
  }
}
