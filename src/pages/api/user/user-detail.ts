import { connect } from '@/backend/db/db-config';
import User from '@/backend/model/userModel';
import validateToken from '@/middleware/validateTokenHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

connect();

async function userDetail(req: NextApiRequest, res: NextApiResponse) {
  //   // console.log('userDetail', req.headers);
  try {
    if (req.method !== 'GET') {
      res.status(400).json({ message: 'wrong http method' });
    }

    const extractDataID = await validateToken(req);
    // const { id } = extractData;
    const currentUser = await User.findOne({ _id: extractDataID });
    //     // console.log('currentUser', currentUser);
    if (!currentUser) {
      return res.json({ message: 'no such user found', status: 400 });
    }
    return res.json({ data: currentUser, status: 200 });
  } catch (error: any) {
    //     // console.log('signup-error', error);
    return res.json({ error: error.message, status: 500 });
  }
}
// export default validateToken(userDetail);
// export default userDetail;

// async function userDetail(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     if (req.method !== 'GET') {
//       res.status(400).json({ message: 'wrong http method' });
//     }

//     const cookies = cookie.parse(req.headers.cookie || '');
//     let token: any = cookies.multi;
//     // console.log('decodedToken', token);

//     const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
//     // console.log('decodedToken', decodedToken.data.userId);
//     const id = decodedToken.data.userId;
//     const currentUser = await User.findOne({ _id: id });
//     if (!currentUser) {
//       return res.json({ message: 'no such user found', status: 400 });
//     }
//     return res.status(200).json({ data: currentUser });
//   } catch (error: any) {
//     console.log('user-detail-error', error);
//     return res.json({ error: error.message, status: 500 });
//   }
// }

export default userDetail;
