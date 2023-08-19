import { connect } from '@/backend/db/db-config';
import User from '@/backend/model/userModel';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
connect();

export default async function ChangePass(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ message: 'invalid http methd' });
    }
    const { token, password } = req.body;
    console.log('chnage-pass', token, password);
    const user = await User.findOne({
      forgotPasswordToken: token,
      // forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    console.log('chnage-pass-user', user);

    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    const hasedPassword = await bcrypt.hash(password, 10);

    user.signUpDetails.password = hasedPassword;
    // user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error: any) {
    return res.json({ error: error.message, status: 500 });
  }
}
