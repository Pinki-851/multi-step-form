import { AppLink } from '@/constants/app-links';
import { CardLayout } from '@/shared/card-layout';
import { FormHeading } from '@/shared/form';
import { SEO } from '@/shared/seo';
import Link from 'next/link';
export default function SuccessfullyMail() {
  return (
    <div>
      <SEO title='Password changed successfully' />
      <CardLayout className='p-[3.2rem]   max-w-[48rem] '>
        <FormHeading className='!text-bold-sub-01 !mt-0'>Password changed successfully</FormHeading>
        <p className='text-reg-body mb-[3.2rem] '>
          {' '}
          Your password has been changed successfully. You can now login to your account using new
          password.
        </p>
        <Link href={AppLink.LOGIN} passHref className='w-full flex justify-center items-center'>
          <button type='submit'>Go to login </button>
        </Link>
      </CardLayout>
    </div>
  );
}
