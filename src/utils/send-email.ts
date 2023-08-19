import User from '@/backend/model/userModel';
import { TOKEN_SECRET } from '@/constants/base-url';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const sendMail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: string;
}) => {
  try {
    console.log('sendEmil called', userId);

    // const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const hashedToken = jwt.sign({ user_id: userId?.toString() }, TOKEN_SECRET!, {
      expiresIn: '30m',
    });

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        // verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      // console.log('sendEmil called-reset', userId);

      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        // forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    // console.log('sendMail-user', await User.findOne({ _id: userId }));
    const transport = nodemailer.createTransport({
      // host and port is for mailtrap
      // host: 'sandbox.smtp.mailtrap.io',
      // port: 2525,
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_NODE_USER,
        pass: process.env.NEXT_PUBLIC_NODE_PASS,
      },
    });

    const mailOptions = {
      from: 'pinkisarojtest@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verfy your email' : 'Reset your password',
      html: `<p>Click ${
        emailType === 'VERIFY'
          ? `  <a href="${process.env.DOMAIN}/flow/verify-email?token=${hashedToken}">here</a> `
          : `  <a href="${process.env.DOMAIN}/flow/forgot-password/new-password?token=${hashedToken}">here</a> `
      }
    to ${
      emailType === 'VERIFY' ? 'verify your emial' : 'reset your password'
    } or copy paste link below in your browser
     ${
       emailType === 'VERIFY'
         ? `${process.env.DOMAIN}/flow/verify-email?token=${hashedToken}`
         : `${process.env.DOMAIN}/flow/forgot-password/new-password?token=${hashedToken}`
     } this is valid for 30 min only
      
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    // console.log('mailres', mailResponse);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
