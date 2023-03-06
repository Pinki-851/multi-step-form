import { useState } from 'react';

import { displayForm } from '@/features/login/display-form';
import { StepController } from '@/features/login/step-controller';
import { Stepper } from '@/features/login/stepper';
import { CardLayout } from '@/shared/card-layout';
import { isRequired } from '@/utils/check-required';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

export default function Login() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  function handlePrev() {
    console.log(currentStep);
    setCurrentStep(prev => prev - 1);
  }

  const methods = useForm();
  const { handleSubmit, trigger } = methods;

  async function handleNext() {
    let isValid = await isRequired(trigger, currentStep);
    // console.log(currentStep, isValid);
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  }

  const onSubmit: SubmitHandler<any> = async (value: any) => {
    console.log(value);
  };

  return (
    <CardLayout>
      <Stepper currentStep={currentStep} />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {displayForm(currentStep)}

          <StepController
            currentStep={currentStep}
            handleNext={() => {
              handleNext();
            }}
            handlePrev={() => handlePrev()}
            // handleSave={() => handleSave()}
          />
        </form>
      </FormProvider>
    </CardLayout>
  );
}
