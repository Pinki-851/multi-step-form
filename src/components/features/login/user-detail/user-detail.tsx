import { useFormContext } from 'react-hook-form';

import { Validation_constant } from '@/constants/form-validator';
import { FormFieldGroupWrapper, FormHeading, InputFieldWrapper } from '@/shared/form';
import { initialVal, LabelAndPlaceholder } from './form-config';

export function UserDetail() {
  const { register, formState } = useFormContext<typeof initialVal>();

  return (
    <>
      <FormHeading>User details</FormHeading>
      <FormFieldGroupWrapper className='mb-[1.6rem]'>
        <InputFieldWrapper
          isRequired={true}
          label={LabelAndPlaceholder?.username?.label}
          placeholder={LabelAndPlaceholder?.username?.placeholder}
          register={register('username', { required: 'Required filed' })}
          error={formState?.errors?.username?.message}
        />
        <InputFieldWrapper
          isRequired={true}
          label={LabelAndPlaceholder?.email?.label}
          placeholder={LabelAndPlaceholder?.email?.label}
          register={register('email', {
            required: 'Required filed',
            pattern: Validation_constant.EMAIL_ID,
          })}
          error={formState?.errors?.email?.message}
        />
        <InputFieldWrapper
          isRequired={true}
          label={LabelAndPlaceholder?.password?.label}
          placeholder={LabelAndPlaceholder?.password?.label}
          register={register('password', { required: 'Required filed' })}
          error={formState?.errors?.password?.message}
        />
      </FormFieldGroupWrapper>
    </>
  );
}
