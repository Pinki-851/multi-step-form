import { connect } from '@/backend/db/db-config';
import User from '@/backend/model/userModel';
import { sendMail } from '@/utils/send-email';
import { NextApiRequest, NextApiResponse } from 'next';
connect();

export default async function ChangePassReq(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ message: 'invalid http methd' });
    }
    const { email } = req.body;
    // how to get rid with this array
    const user = await User.find({ 'signUpDetails.email': email });
    if (!user) {
      return res.status(400).json({ message: 'no user found with this emial' });
    }

    await sendMail({ email: req.body.email, emailType: 'RESET', userId: user?.[0]?._id as string });
    
    return res.status(200).json({ message: 'change pass requested' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message, status: 500 });
  }
}
