import { CardLayout } from '@/shared/card-layout';

export default function VerifyMail() {
  return (
    <div className='p-[3.2rem] w-full sm:w-auto '>
      <CardLayout className='min-h-[36rem] flex justify-center items-center p-[3.2rem] '>
        <div>
          <p className='text-reg-body text-black'>
            We have sent you verification mail on your registerd email.
          </p>
          <p className='text-reg-body text-blue-08 text-center'>Please check your mail</p>
        </div>
      </CardLayout>
    </div>
  );
}
