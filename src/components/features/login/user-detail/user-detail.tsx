import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Validation_constant } from '@/constants/form-validator';
import { Eyeoff } from '@/icons/eye-off';
import { Eye } from '@/icons/eye-on';
import { FormFieldGroupWrapper, FormHeading, InputFieldWrapper } from '@/shared/form';
import { StrengthChecker } from '../password/strength-checker';
import { LabelAndPlaceholder, initialVal } from './form-config';

export function UserDetail() {
  const { register, formState } = useFormContext<typeof initialVal>();
  const [password, setPassword] = useState('');
  const [showEye, setShowEye] = useState(false);
  const [showStrenghtChecker, setShowStrengthChecker] = useState(true);

  return (
    <>
      <FormHeading>User details</FormHeading>
      <FormFieldGroupWrapper className='mb-[1.6rem]'>
        <InputFieldWrapper
          autoComplete={'off'}
          isRequired={true}
          label={LabelAndPlaceholder?.username?.label}
          placeholder={LabelAndPlaceholder?.username?.placeholder}
          register={register('username', {
            required: 'Required filed',
            // pattern: Validation_constant?.ALPHABETS,
          })}
          error={formState?.errors?.username?.message}
        />
        <InputFieldWrapper
          isRequired={true}
          label={LabelAndPlaceholder?.email?.label}
          placeholder={LabelAndPlaceholder?.email?.placeholder}
          register={register('email', {
            required: 'Required filed',
            pattern: Validation_constant.EMAIL_ID,
          })}
          error={formState?.errors?.email?.message}
        />
        <div className='relative'>
          <InputFieldWrapper
            isRequired={true}
            type={showEye ? 'text' : 'password'}
            label={LabelAndPlaceholder?.password?.label}
            placeholder={LabelAndPlaceholder?.password?.placeholder}
            register={register('password', {
              required: 'Required filed',
              // pattern: Validation_constant.PASSWORD,
            })}
            error={formState?.errors?.password?.message}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e?.target?.value);
              setShowStrengthChecker(true);
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
        {showStrenghtChecker && <StrengthChecker password={password} />}
      </FormFieldGroupWrapper>
    </>
  );
}
