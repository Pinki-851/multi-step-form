/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TOKEN_SECRET } from '@/constants/base-url';
import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

const validateToken = async (req: NextApiRequest) => {
  // console.log('req=validation', req);
  // eslint-disable-next-line no-useless-catch
  try {
    let token: any;
    const authHeader: string | any = req.headers.authorization || req.headers.Authorization;
    // console.log('authHeader', authHeader, authHeader?.split(' ')[1]);
    if (!authHeader) {
      throw { status: 400, message: 'auth header not found' };
    }

    if (!authHeader.startsWith('Bearer')) {
      throw { status: 400, message: 'add Bearer in auth header' };
    }

    token = authHeader?.split(' ')[1];
    // token = Cookies.get('multi');
    const decodedToken: any = jwt.verify(token, TOKEN_SECRET!);
    console.log('decodedtoken', token, decodedToken);
    return decodedToken?.data?.userId;
  } catch (err: any) {
    // console.log('token-validation', err);
    // return NextResponse.next(err);
    throw err;
  }
};
export default validateToken;
