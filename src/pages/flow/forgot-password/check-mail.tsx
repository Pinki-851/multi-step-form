import { AppLink } from '@/constants/app-links';
import { API_URL } from '@/services/form';
import { ButtonWithLoading } from '@/shared/button-with-loading';
import { CardLayout } from '@/shared/card-layout';
import { FormHeading } from '@/shared/form';
import { SEO } from '@/shared/seo';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ghostbtnStyle } from './new-password';

interface CMProps {
  data: any;
}
export default function CheckMail(props: CMProps) {
  const { data } = props;
  const [loading, setLoading] = useState(false);

  async function resendMail() {
    setLoading(true);
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
      setLoading(false);
      toast.success('Email sent successfully');
    }
  }
  return (
    <div>
      {' '}
      <SEO title='Check email' />
      <CardLayout className='max-w-[36rem] p-[3.2rem]'>
        <FormHeading className='!text-bold-sub-01 !mt-0'>Check email</FormHeading>

        <p className='text-reg-body'>
          Please check your email <strong>{data?.email}</strong>, we have sent an email that
          contains a link to reset your password.
        </p>
        <br />

        <div className='mt-[6rem] flex w-full flex-col items-center justify-center gap-[.8rem]'>
          <ButtonWithLoading
            loading={loading}
            btnText='Resend email'
            onClick={() => {
              resendMail();
            }}
          />
          <Link href={AppLink?.LOGIN} passHref className='w-full'>
            <button type='submit' className={`w-full ${ghostbtnStyle}`}>
              Go to login{' '}
            </button>
          </Link>
        </div>
      </CardLayout>
    </div>
  );
}
