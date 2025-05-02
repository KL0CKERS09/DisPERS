import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
}

export function authenticate(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: () => void // Explicitly define the type of next function
) {
  // Extract token from cookies
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token and attach userId to the request
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = (decoded as { userId: string }).userId;
    
    // Proceed to the next middleware/handler
    next();
  } catch (error) {
    // Handle any errors during token verification
    console.error('JWT Error:', error); // Log the error for debugging
    return res.status(401).json({ message: 'Invalid token' });
  }
}
