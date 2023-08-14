import { AppLink } from '@/constants/app-links';
import { API_URL } from '@/services/form';
import { sendData } from '@/utils/send-data';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function VerifyEmail() {
  const { query } = useRouter();
  const [verified, setVerified] = useState(false);

  async function verifyMail() {
    const res = await sendData({
      url: API_URL.VERIFY_EMAIL,
      method: 'POST',
      body: {
        token: query?.token,
      },
    });
    if (res) {
      setVerified(true);
    }
    // console.log('res-verify', res.status);
  }
  return (
    <div className='w-full h-full flex  flex-col justify-center items-center'>
      <button
        onClick={() => {
          verifyMail();
        }}
      >
        Verify Your Email
      </button>
      {/* <h2>{query?.token ? query?.token : 'no token'}</h2> */}
      {verified && (
        <>
          <h2 className='text-[1.4rem] text-white'>Email verified</h2>
          <Link href={AppLink.LOGIN} passHref className='text-[1.6rem] text-blue-700 underline'>
            Log in
          </Link>
        </>
      )}
    </div>
  );
}
