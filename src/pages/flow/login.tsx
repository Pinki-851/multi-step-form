import { AppLink } from '@/constants/app-links';
import { Validation_constant } from '@/constants/form-validator';
import { Eyeoff } from '@/icons/eye-off';
import { Eye } from '@/icons/eye-on';
import { Spinner } from '@/icons/spinner';
import { API_URL } from '@/services/form';
import { CardLayout } from '@/shared/card-layout';
import { FormFieldGroupWrapper, FormHeading, InputFieldWrapper } from '@/shared/form';
import { sendData } from '@/utils/send-data';
import Cookies from 'js-cookie';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const initialVal = { email: '', password: '' };
export default function Login() {
  const [password, setPassword] = useState('');
  const [showEye, setShowEye] = useState(false);
  const [loading, setLoading] = useState(false);

  const { query } = useRouter();
  const { email, pass, name } = query;

  const methods = useForm({
    defaultValues: initialVal,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, formState, register } = methods;
  const onSubmit: SubmitHandler<any> = async (value: any) => {
    setLoading(true);
    const res: any = await sendData({
      url: API_URL.LOGIN,
      body: { email: value?.email, password },
      method: 'POST',
      showToast: false,
    });
    if (res?.token) {
      // localStorage.setItem('multi', res?.multi);
      Cookies.set('multi', res?.token);
      toast.success('successfully login');
      setLoading(false);
      router.push('/');
    } else {
      setLoading(false);

      toast.error('somthing went wrong please try again');
    }
  };
  return (
    <div className='p-[3.2rem] w-full sm:w-auto'>
      <CardLayout>
        <FormHeading className='!text-bold-sub-01 !mt-0'>Login</FormHeading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormFieldGroupWrapper className='grid-cols-1'>
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

            <div className='relative'>
              <InputFieldWrapper
                isRequired={true}
                type={showEye ? 'text' : 'password'}
                label={'Password'}
                placeholder={'Enter password'}
                register={register('password', {
                  required: 'Required filed',
                  // pattern: Validation_constant.PASSWORD,
                })}
                error={formState?.errors?.password?.message}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e?.target?.value);
                }}
              />
              <Link
                href={AppLink.forgot_pass}
                className='absolute top-0 right-0 text-med-body-sm text-blue-06'
              >
                forgot password?
              </Link>

              <div
                onClick={() => {
                  setShowEye(!showEye);
                }}
                className='absolute top-[3.8rem] right-[1.6rem] cursor-pointer'
              >
                {showEye ? <Eye /> : <Eyeoff />}
              </div>
            </div>

            <button
              onClick={handleSubmit(onSubmit)}
              className='mt-[1.6rem] h-[5rem] flex justify-center items-center gap-[.8rem]'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner className='w-[1.6rem] h-[1.6rem] fill-white' />
                  Processing...
                </>
              ) : (
                'Login'
              )}
            </button>
          </FormFieldGroupWrapper>
        </form>

        <p className='text-center py-[2rem] text-[1.2rem]'>
          Don't have an account?{' '}
          <Link href={'/flow/signup'} className='text-indigo-600 font-medium'>
            Sign Up
          </Link>{' '}
        </p>
      </CardLayout>
    </div>
  );
}
