import { NextApiResponse } from 'next';
import { connectToDB } from "@/libs/mongodb";
import User from '../../../models/login';  
import { authenticate, AuthenticatedRequest } from '../../../libs/auth';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  await connectToDB();

  // Apply the authenticate middleware
  authenticate(req, res, async () => {
    const userId = req.userId; // Access the userId from the request after authentication
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(userId).lean();

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  });
}
