import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Layout } from '../components/layout';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Toaster
        position='bottom-right'
        reverseOrder={false}
        toastOptions={{ className: ' px-[2rem]' }}
      />
      <Component {...pageProps} />
    </Layout>
  );
}
