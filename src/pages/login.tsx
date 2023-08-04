import { Validation_constant } from '@/constants/form-validator';
import { Eyeoff } from '@/icons/eye-off';
import { Eye } from '@/icons/eye-on';
import { API_URL } from '@/services/form';
import { CardLayout } from '@/shared/card-layout';
import { FormFieldGroupWrapper, FormHeading, InputFieldWrapper } from '@/shared/form';
import { sendData } from '@/utils/send-data';
import router, { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const initialVal = { email: '', password: '' };
export default function Login() {
  const [password, setPassword] = useState('');
  const [showEye, setShowEye] = useState(false);

  const { query } = useRouter();
  const { email, pass, name } = query;

  const methods = useForm({
    defaultValues: initialVal,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, formState, register } = methods;
  const onSubmit: SubmitHandler<any> = async (value: any) => {
    const res = await sendData({ url: API_URL.LOGIN, body: value, method: 'POST' });
    // const res = await fetch('/api/user/login', {
    //   method: 'POST',
    //   body: JSON.stringify(value),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // if (email === value?.email && pass === value?.password) {
    if (res.status === 200) {
      router.push({
        pathname: '/wel-come',
        query: { name },
      });
    }
  };
  return (
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
            <div
              onClick={() => {
                setShowEye(!showEye);
              }}
              className='absolute top-[3.8rem] right-[1.6rem] cursor-pointer'
            >
              {showEye ? <Eye /> : <Eyeoff />}
            </div>
          </div>

          <button onClick={handleSubmit(onSubmit)} className='mt-[1.6rem] h-[5rem]'>
            Login
          </button>
        </FormFieldGroupWrapper>
      </form>
    </CardLayout>
  );
}
