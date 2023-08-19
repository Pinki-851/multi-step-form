// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from 'iron-session';

export const sessionOptions: IronSessionOptions = {
  password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD as string,
  cookieName: 'multi-step_next-auth.session-token',
  cookieOptions: {
    secure: process.env.NEXT_PUBLIC_IS_SECURE === 'false' ? false : true, // false for staging and development
  },
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: any; // User
  }
}
