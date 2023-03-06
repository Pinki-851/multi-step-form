import { Check } from '@/icons/check';
import { steps } from './steps';

interface StepperProp {
  currentStep: number;
}
export function Stepper(props: StepperProp) {
  const { currentStep } = props;

  return (
    <div className={`flex justify-between items-center gap-[1.6rem] `}>
      {steps?.map((val, index) => {
        const checkCondition = currentStep === index + 1 || index + 1 < currentStep;

        return (
          <div
            className={`step-item flex flex-col justify-center items-center relative ${
              checkCondition && 'complete'
            }`}
            key={index}
          >
            <div
              className={`w-[2.5rem] h-[2.5rem] flex justify-center items-center rounded-full ${
                checkCondition ? 'bg-blue-06 text-white' : 'bg-gray-200'
              } text-center text-[1rem] shadow-extra-small relative z-10`}
            >
              {currentStep > index + 1 ? <Check className='' /> : index + 1}
            </div>
            <p className='text-[1.2rem]'>{val}</p>
          </div>
        );
      })}
    </div>
  );
}
