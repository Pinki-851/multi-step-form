import { WelcomeCard } from '@/features/wel-come-card';
import { Spinner } from '@/icons/spinner';
import { sessionLogout } from '@/lib/i-logout';
import { sessionOptions } from '@/lib/i-session';
import { withIronSessionSsr } from 'iron-session/next';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function WelCome() {
  const [userData, setUserData] = useState<any>();
  async function handleLogout() {
    await sessionLogout();
  }
  // console.log('welcome', Cookies.get('multi'));
  async function fetchUserDetail() {
    const res = await fetch('/api/user/user-detail', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('multi')}`,
      },
    });
    const finalres = await res.json();
    setUserData(finalres);
    // console.log('res', res, finalres);
  }
  useEffect(() => {
    fetchUserDetail();
  }, []);
  if (!userData) {
    return <Spinner className='w-[10rem] h-[10rem] fill-white' />;
  }
  return (
    <div className='text-white text-med-body flex flex-col gap-[1.6rem]'>
      <p className='text-center text-[1.6rem]'>Wel-come!!</p>
      <WelcomeCard
        mobile={userData?.data?.personalDetails?.mobile}
        username={userData?.data?.signUpDetails?.username}
        email={userData?.data?.signUpDetails?.email}
      />
      <button
        className='text-blue-06 bg-white hover:bg-white hover:text-blue-08'
        onClick={() => {
          handleLogout();
        }}
      >
        Log out
      </button>
    </div>
  );
}
export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;
  // console.log('user', user);
  if (user === undefined) {
    return {
      redirect: { destination: '/flow/login', permanent: false },
    };
  }

  return {
    props: { user: req.session.user ?? null },
  };
}, sessionOptions);
