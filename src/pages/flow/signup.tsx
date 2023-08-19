import { useState } from 'react';

import { AppLink } from '@/constants/app-links';
import { displayForm } from '@/features/login/display-form';
import { StepController } from '@/features/login/step-controller';
import { Stepper } from '@/features/login/stepper';
import { API_URL } from '@/services/form';
import { CardLayout } from '@/shared/card-layout';
import { isRequired } from '@/utils/check-required';
import { sendData } from '@/utils/send-data';
import Link from 'next/link';
import router from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Login() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formCompleted, setFormCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      // alert(JSON.stringify(value));
      console.log('signup-front', value);
      const res = await sendData({
        url: API_URL.SIGNUP,
        body: value,
        method: 'POST',
        showToast: false,
      });
      // const res = await fetch('/api/user/signup', {
      //   method: 'POST',
      //   body: JSON.stringify(value),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // TODO:when everything is completed donot take user in login make sure token is provided here
      console.log(res, 'login');
      if (res?.error) {
        toast.error(res?.error);
        setLoading(false);
      }
      if (res?.status === 200) {
        setLoading(false);
        toast.success('user created successfully');
        router.push({
          pathname: AppLink.VERIFY_MAIL_MESSAGE,
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
            loadng={loading}
          />
        </form>
      </FormProvider>

      <p className='text-center py-[2rem] text-[1.2rem]'>
        Already have account?{' '}
        <Link href={'/flow/login'} className='text-indigo-600 font-medium'>
          Log in
        </Link>{' '}
      </p>
    </CardLayout>
  );
}
