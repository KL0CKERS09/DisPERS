// libs/auth.ts
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function authenticate(req: NextRequest) {
  // Assume the JWT token is passed via the Authorization header
  const token = req.headers.get('Authorization')?.split(' ')[1]; // 'Bearer <token>'

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded.userId; // Assuming userId is stored in the JWT
  } catch (err) {
    return null;
  }
}
