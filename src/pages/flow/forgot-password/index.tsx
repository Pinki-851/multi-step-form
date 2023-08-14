import { AppLink } from '@/constants/app-links';
import { Validation_constant } from '@/constants/form-validator';
import { API_URL } from '@/services/form';
import { CardLayout } from '@/shared/card-layout';
import { FormHeading, InputFieldWrapper } from '@/shared/form';
import { SEO } from '@/shared/seo';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CheckMail from './check-mail';

const initialValue = {
  email: '',
};

export default function ForgotPassword() {
  const [hasResponse, setHasResponse] = useState(false);
  const [data, setData] = useState<string>('');

  const method = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initialValue,
  });
  const { register, handleSubmit, formState } = method;
  const onSubmit: SubmitHandler<{
    email: string;
  }> = async value => {
    const { email } = value;

    const url = API_URL.CHANGE_PASSWORD_REQUEST;

    // const myHeaders = new Headers({
    //   'Content-Type': 'application/json',
    //   Authorization: localStorage.getItem('mfsClient') ?? '',
    // });

    const res: any = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res?.status !== 200) {
      toast.error('Email not found');
    }
    if (res?.status === 200) {
      toast.success('Email sent successfully');
      setHasResponse(res);
      setData(email);
      // push(AppLinks?.forgot_pass?.check_mail);
    }
  };
  return (
    <div>
      <SEO title='Forgot password' />
      {hasResponse ? (
        <CheckMail data={data} />
      ) : (
        <CardLayout>
          <FormHeading className='!text-bold-sub-01 !mt-0'>Forgot password?</FormHeading>

          <p className='text-reg-body'>To recover your account, enter your email below.</p>
          {/* <LoginContainer
          heading="Forgot password?"
          helperText="To recover your account, enter your email below."
        > */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputFieldWrapper
              label='Email'
              placeholder='Enter email'
              isRequired={true}
              register={register('email', {
                required: 'Required field',
                pattern: Validation_constant.EMAIL_ID,
              })}
              error={formState?.errors?.email?.message}
            />

            <button className='mt-[4.8rem] w-full '>Reset password</button>
            <Link href={AppLink.LOGIN} passHref>
              <button className='mt-[.8rem] w-full'>Back to login</button>
            </Link>
          </form>
        </CardLayout>
      )}
    </div>
  );
}
