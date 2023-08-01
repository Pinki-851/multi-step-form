// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from '@/backend/db/db-config';
import User from '@/backend/model/userModel';
import { TOKEN_SECRET } from '@/constants/base-url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
// type Data = {
//   email: string;
//   password:string;
// };
connect();

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ message: 'http method is worng' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'please enter email and password' });
    }

    const user = await User.findOne({ 'signUpDetails.email': email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'no such user found please enter correct password or email' });
    }

    const check_pass = await bcrypt.compare(password, user.signUpDetails.password);
    // to check thorow is working or not
    if (!check_pass) {
      throw res.status(400).json({ message: 'Invalid credential please try again' });
    }
    const payload = {
      userId: user._id,
      email: user.signUpDetails.email,
      password: user.signUpDetails.password,
    };
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = jwt.sign({ data: payload }, TOKEN_SECRET!, { expiresIn: '1h' });
    // res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
    return res.status(200).json({
      message: 'login succesfull',
      email: user.signUpDetails.email,
      pass: user.signUpDetails.password,
      token,
    });
  } catch (error: any) {
    console.log('login-error', error);
    return res.json({ error: error.message, status: 500 });
  }
}
