import { Spinner } from '@/icons/spinner';

interface BtnProps {
  loading: boolean;
  btnText: string;
  onClick?: () => void;
}
export function ButtonWithLoading(props: BtnProps) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { loading, btnText, onClick = () => {} } = props;
  return (
    <button
      type='submit'
      className='mt-[3.2rem] w-full'
      disabled={loading}
      onClick={() => {
        onClick();
      }}
    >
      {loading ? (
        <>
          <Spinner className='w-[1.6rem] h-[1.6rem] fill-white' />
          Processing...
        </>
      ) : (
        btnText
      )}
    </button>
  );
}
