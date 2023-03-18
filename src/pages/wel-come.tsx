import { useRouter } from 'next/router';

export default function WelCome() {
  const { query } = useRouter();
  return <div className='text-white text-med-body'>Wel-come {query?.name}!!</div>;
}
