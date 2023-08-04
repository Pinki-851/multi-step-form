import { useFormContext } from 'react-hook-form';

import { Validation_constant } from '@/constants/form-validator';
import { FormFieldGroupWrapper, FormHeading, InputFieldWrapper } from '@/shared/form';
import { LabelAndPlaceholder, personalDeatilsInitialVal } from './form-config';

export function PersonalDetail() {
  const { register, formState } = useFormContext<typeof personalDeatilsInitialVal>();
  return (
    <>
      <FormHeading>Personal details</FormHeading>
      <FormFieldGroupWrapper className='mb-[1.6rem]'>
        <InputFieldWrapper
          isRequired={true}
          label={LabelAndPlaceholder?.first_name?.label}
          placeholder={LabelAndPlaceholder?.first_name?.placeholder}
          register={register('first_name', { required: 'Required filed' })}
          error={formState?.errors?.first_name?.message}
        />
        <InputFieldWrapper
          isRequired={true}
          label={LabelAndPlaceholder?.last_name?.label}
          placeholder={LabelAndPlaceholder?.last_name?.placeholder}
          register={register('last_name', {
            required: 'Required filed',
            pattern: Validation_constant.ALPHABETS,
          })}
          error={formState?.errors?.last_name?.message}
        />
        <InputFieldWrapper
          isRequired={true}
          label={LabelAndPlaceholder?.mobile?.label}
          placeholder={LabelAndPlaceholder?.mobile?.placeholder}
          register={register('mobile', {
            required: 'Required filed',
            pattern: Validation_constant.MOBILE_NUMBER,
          })}
          error={formState?.errors?.mobile?.message}
        />
      </FormFieldGroupWrapper>
    </>
  );
}
