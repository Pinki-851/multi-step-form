import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  email: string;
  password: string;
};

export default async function SignUp(req: NextApiRequest, res: NextApiResponse<Data>) {
  const formattedJSON = JSON.parse(await req.body);
  const { username, password, email } = formattedJSON;
  //   console.log('response', { username, password, email }, req.body);
  res.status(200).json({ email: email, password: password });
}
