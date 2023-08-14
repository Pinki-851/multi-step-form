import User from '@/backend/model/userModel';
import bcryptjs from 'bcryptjs';
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
    // console.log('sendEmil called', userId);
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      // console.log('sendEmil called-reset', userId);

      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    // console.log('sendMail-user', await User.findOne({ _id: userId }));
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.NEXT_PUBLIC_NODE_USER,
        pass: process.env.NEXT_PUBLIC_NODE_PASS,
      },
    });

    const mailOptions = {
      from: 'pinki@gmail.com',
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
      ${process.env.DOMAIN}/flow/verify-email?token=${hashedToken}
      
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
