import { connect } from '@/backend/db/db-config';
import User from '@/backend/model/userModel';
import { sendMail } from '@/utils/send-email';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

connect();

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('request', req.body, 'req.method', req.method);
    const { email, username, password, first_name, last_name, mobile } = req.body;
    console.log('check', email, username, password, first_name, last_name, mobile);
    if (!email || !username || !password) {
      return res.json({ message: 'all field are required', status: 400 });
    }
    const currentUser = await User.findOne({ email });
    console.log('currentUser', currentUser);
    if (currentUser) {
      return res.json({ message: 'user already exist', status: 400 });
    }
    const hasedPassword = await bcrypt.hash(password, 10);

    // console.log('req after hash', req.body);
    const newUser = {
      personalDetails: {
        first_name,
        last_name,
        mobile,
      },
      signUpDetails: {
        username,
        email: req.body.email,
        password: hasedPassword,
      },
    };
    const user = await User.create({ ...newUser });

    // send verification mail
    await sendMail({ email: req.body.email, emailType: 'VERIFY', userId: user._id });
    console.log('user', user);
    return res.json({ message: 'user create successfully', status: 200, user });
  } catch (error: any) {
    console.log('signup-error', error);
    return res.json({ error: error.message, status: 500 });
  }
}
