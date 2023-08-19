import { Spinner } from '@/icons/spinner';
import { steps } from './steps';

interface SCProps {
  currentStep: number;
  handleNext: () => void;
  handlePrev: () => void;
  handleSave: () => void;
  loadng?: boolean;
}
export function StepController(props: SCProps) {
  const { currentStep, handleNext, handlePrev, handleSave, loadng = false } = props;
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

      {currentStep === steps.length ? (
        <button onClick={() => handleSave()} disabled={loadng}>
          {loadng ? (
            <>
              <Spinner className='w-[1.6rem] h-[1.6rem] fill-white' />
              Processing...
            </>
          ) : (
            'save'
          )}
        </button>
      ) : (
        <button
          type='button'
          onClick={() => {
            handleNext();
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}
