interface WCProps {
  mobile: string;
  email: string;
  username: string;
}
export function WelcomeCard(props: WCProps) {
  const { mobile, email, username } = props;

  const user = username?.split(' ');
  const finalName = user?.[0]?.split('')[0] + user?.[user?.length - 1]?.split('')[0];
  return (
    <div className='w-[50vh] h-[50vh] bg-white rounded-[4px]'>
      <div className='bg-indigo-500 h-[20rem] p-[2rem] rounded-t-[4px] w-full flex justify-center items-center'>
        <div className='w-[15rem] uppercase h-[15rem] bg-white rounded-full p-[2rem] font-medium text-[4.8rem] text-indigo-500 flex justify-center items-center'>
          {finalName}
        </div>
      </div>
      <div className='text-black pt-[1rem] w-full text-[1.4rem] gap-[.4rem] flex flex-col justify-center items-center '>
        <p className='capitalize'>{username}</p>
        <p>{email}</p>
        <p>{mobile}</p>
      </div>
    </div>
  );
}
