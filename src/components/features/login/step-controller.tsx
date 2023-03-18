import { steps } from './steps';

interface SCProps {
  currentStep: number;
  handleNext: () => void;
  handlePrev: () => void;
  handleSave: () => void;
}
export function StepController(props: SCProps) {
  const { currentStep, handleNext, handlePrev, handleSave } = props;
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
        <button onClick={() => handleSave()}>save</button>
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
