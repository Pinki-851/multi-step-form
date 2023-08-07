import { sessionLogout } from '@/lib/i-logout';
import { sessionOptions } from '@/lib/i-session';
import { withIronSessionSsr } from 'iron-session/next';

export default function WelCome() {
  async function handleLogout() {
    await sessionLogout();
  }
  return (
    <div className='text-white text-med-body flex flex-col gap-[1.6rem]'>
      Wel-come !!
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
  console.log('user', user);
  if (user === undefined) {
    return {
      redirect: { destination: '/flow/login', permanent: false },
    };
  }

  return {
    props: { user: req.session.user ?? null },
  };
}, sessionOptions);
