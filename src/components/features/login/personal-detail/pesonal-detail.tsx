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
          label={LabelAndPlaceholder?.firstname?.label}
          placeholder={LabelAndPlaceholder?.firstname?.placeholder}
          register={register('firstname', { required: 'Required filed' })}
          error={formState?.errors?.firstname?.message}
        />
        <InputFieldWrapper
          isRequired={true}
          label={LabelAndPlaceholder?.lastname?.label}
          placeholder={LabelAndPlaceholder?.lastname?.placeholder}
          register={register('lastname', {
            required: 'Required filed',
            pattern: Validation_constant.ALPHABETS,
          })}
          error={formState?.errors?.lastname?.message}
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
