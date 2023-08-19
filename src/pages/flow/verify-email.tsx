import { AppLink } from '@/constants/app-links';
import { API_URL } from '@/services/form';
import { sendData } from '@/utils/send-data';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function VerifyEmail() {
  const { query } = useRouter();
  const [verified, setVerified] = useState(false);

  async function verifyMail() {
    const res = await sendData({
      url: API_URL.VERIFY_EMAIL,
      method: 'POST',
      showToast: false,
      body: {
        token: query?.token,
      },
    });
    if (res?.message === 'user not found') {
      toast.error(res?.message);
    } else if (res?.message !== 'user not found') {
      toast.success('Verification successful');
      setVerified(true);
    }
  }
  return (
    <div className='w-full h-full flex  flex-col gap-[.8rem] justify-center items-center'>
      {verified ? (
        <>
          <h2 className='text-[1.4rem] text-white'>Email verified</h2>
          <Link href={AppLink.LOGIN} passHref>
            <button>Log in</button>
          </Link>
        </>
      ) : (
        <button
          onClick={() => {
            verifyMail();
          }}
          disabled={verified}
        >
          Verify Your Email
        </button>
      )}
    </div>
  );
}
