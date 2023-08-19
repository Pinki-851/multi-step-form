import { AppLink } from '@/constants/app-links';
import { API_URL } from '@/services/form';
import { ButtonWithLoading } from '@/shared/button-with-loading';
import { CardLayout } from '@/shared/card-layout';
import { FormHeading, InputFieldWrapper } from '@/shared/form';
import { SEO } from '@/shared/seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
const initialValue = {
  new_password: '',
  confirm_password: '',
};

export default function NewPassword() {
  const { push, query } = useRouter();
  const [loading, setLoading] = useState(false);

  const token: any = query?.token
    ? query?.token
    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdXJhdi50aGFrdXJAbWZzY2FwaXRhbHBhcnRuZXJzLmNvbSIsImlhdCI6MTY4NjgyMzQwMCwiZXhwIjoxNjg2ODI3MDAwfQ.ORX8opOo1raP9LZwb3lGFr7a2tpEY0xBJAHb3ta7ljI';

  const method = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initialValue,
  });
  const { register, handleSubmit, formState } = method;
  const onSubmit: SubmitHandler<{
    new_password: string;
    confirm_password: string;
  }> = async value => {
    setLoading(true);
    const { confirm_password, new_password } = value;
    const call_api = new_password === confirm_password ? true : false;

    //eslint-disable-next-line
    if (call_api) {
      const sendRes = { token: token, password: new_password };
      const url = API_URL.CHANGE_PASSWORD;

      const res: any = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(sendRes),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res?.status === 200) {
        setLoading(false);
        toast.success(res?.message);

        push(AppLink?.forgot_pass_success);
      }
    } else {
      toast.error('password do not match');
    }
  };
  return (
    <div>
      {' '}
      <SEO title='Create new password' />
      <CardLayout>
        <FormHeading className='!text-bold-sub-01 !mt-0'>Create new password</FormHeading>
        <p className='text-reg-body'>Enter your new password to continue.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputFieldWrapper
            isRequired={true}
            label={'New password'}
            placeholder={'Password'}
            register={register('new_password', {
              required: 'Required field',
              //   pattern: VALIDATION_CONSTANTS.ALPHA_NUMERIC,
            })}
            error={formState?.errors?.new_password?.message}
          />
          <InputFieldWrapper
            isRequired={true}
            label={'Confirm New password'}
            placeholder={'Password'}
            register={register('confirm_password', {
              required: 'Required field',
              //   pattern: VALIDATION_CONSTANTS.ALPHA_NUMERIC,
            })}
            error={formState?.errors?.confirm_password?.message}
            className='mt-[3.2rem]'
          />

          <ButtonWithLoading btnText='Reset password' loading={loading} />

          <Link href={AppLink.LOGIN} passHref>
            <button type='submit' className={`mt-[.8rem] w-full  ${ghostbtnStyle}`}>
              Back to login
            </button>
          </Link>
        </form>
      </CardLayout>
    </div>
  );
}

export const ghostbtnStyle =
  'bg-transparent hover:bg-indigo-200 transition-all duration-300 ease-in-out text-blue-06 hover:text-white';
