import { AppLink } from '@/constants/app-links';
import { API_URL } from '@/services/form';
import { CardLayout } from '@/shared/card-layout';
import { FormHeading } from '@/shared/form';
import { SEO } from '@/shared/seo';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface CMProps {
  data: any;
}
export default function CheckMail(props: CMProps) {
  const { data } = props;

  async function resendMail() {
    const url = API_URL.CHANGE_PASSWORD_REQUEST;

    const res: any = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email: data }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res?.status !== 200) {
      toast.error('Email not found');
    }
    // console.log('res', res);
    if (res?.status === 200) {
      toast.success('Email sent successfully');
    }
  }
  return (
    <div>
      {' '}
      <SEO title='Check email' />
      <CardLayout>
        <FormHeading className='!text-bold-sub-01 !mt-0'>Check email</FormHeading>

        {/* <LoginContainer
        heading='Check email'
        helperText={
          <>
            <span>
              Please check your email <strong>{data?.email}</strong>, we have sent an email that
              contains a link to reset your password.
            </span>
            <br />
          </>
        }
      > */}
        <p className='text-reg-body'>
          Please check your email <strong>{data?.email}</strong>, we have sent an email that
          contains a link to reset your password.
        </p>
        <br />

        <div className='mt-[6rem] flex w-full flex-col items-center justify-center gap-[.8rem]'>
          <button
            className='mx-auto mt-[.8rem] w-full'
            onClick={() => {
              resendMail();
            }}
          >
            Resend email
          </button>

          <Link href={AppLink?.LOGIN} passHref className='w-full'>
            <button type='submit' className='w-full'>
              Go to login{' '}
            </button>
          </Link>
        </div>
      </CardLayout>
    </div>
  );
}
