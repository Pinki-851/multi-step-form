import { steps } from './steps';

interface SCProps {
  currentStep: number;
  handleNext: () => void;
  handlePrev: () => void;
}
export function StepController(props: SCProps) {
  const { currentStep, handleNext, handlePrev } = props;
  return (
    <div className='flex justify-end gap-[1.6rem] items-center'>
      <button
        type='button'
        disabled={currentStep === 1 ? true : false}
        onClick={() => {
          handlePrev();
        }}
      >
        back
      </button>

      <button
        type={currentStep === steps.length ? 'submit' : 'button'}
        onClick={() => {
          handleNext();
        }}
      >
        {currentStep === steps.length ? 'Save' : 'Next'}
      </button>
    </div>
  );
}
