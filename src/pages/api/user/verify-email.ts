import { connect } from '@/backend/db/db-config';
import User from '@/backend/model/userModel';
import { NextApiRequest, NextApiResponse } from 'next';
connect();

export default async function VerifyEmail(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ message: 'invalid http methd' });
    }
    const { token } = req.body;
    console.log('verify-toke', token);
    const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    console.log('verify-user', user);

    user.isVerified = true;
    // need to discuss why we are doing this
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error: any) {
    return res.json({ error: error.message, status: 500 });
  }
}
