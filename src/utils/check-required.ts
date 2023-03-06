import { personalDeatilsInitialVal } from '@/features/login/personal-detail/form-config';
import { initialVal } from '@/features/login/user-detail/form-config';
import { FieldValues, UseFormTrigger } from 'react-hook-form';

export async function isRequired<T>(trigger: UseFormTrigger<FieldValues>, currentStep: number) {
  let isValid = false;

  switch (currentStep) {
    case 1:
      console.log(trigger([...Object.keys(initialVal)]));
      isValid = await trigger([...Object.keys(initialVal)]);
      break;
    case 2:
      isValid = await trigger([...Object.keys(personalDeatilsInitialVal)]);
  }
  return isValid;
}
