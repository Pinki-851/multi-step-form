import { useState } from 'react';

import { displayForm } from '@/features/login/display-form';
import { StepController } from '@/features/login/step-controller';
import { Stepper } from '@/features/login/stepper';
import { CardLayout } from '@/shared/card-layout';
import { isRequired } from '@/utils/check-required';
import router from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

export default function Login() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formCompleted, setFormCompleted] = useState(false);

  function handlePrev() {
    setCurrentStep(prev => prev - 1);
  }

  const methods = useForm();
  const { handleSubmit, trigger } = methods;

  async function handleNext() {
    let isValid = await isRequired(trigger, currentStep);
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  }

  const onSubmit: SubmitHandler<any> = async (value: any) => {
    if (formCompleted) {
      alert(JSON.stringify(value));
      const res = await fetch('/api/user/sign-up', { method: 'POST', body: JSON.stringify(value) });
      console.log(res, 'login');
      if (res.status === 200) {
        router.push({
          pathname: '/login',
          query: { name: value?.username, email: value?.email, pass: value?.password },
        });
      }
    }
  };

  return (
    <CardLayout>
      <Stepper currentStep={currentStep} />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {displayForm(currentStep)}
          {/* </form> */}
          <StepController
            currentStep={currentStep}
            handleNext={() => {
              handleNext();
            }}
            handlePrev={() => handlePrev()}
            handleSave={() => {
              setFormCompleted(true);
              handleSubmit(onSubmit);
            }}
          />
        </form>
      </FormProvider>
    </CardLayout>
  );
}
