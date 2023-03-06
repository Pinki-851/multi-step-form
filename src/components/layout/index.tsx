import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { LoggedOut } from './logged-out';

export interface LayoutProps {
  children: ReactNode;
}
export function Layout(props: LayoutProps) {
  const { children } = props;
  const router = useRouter();
  return (
    <div className='w-full min-h-screen h-full overflow-hidden '>
      {/* {router.pathname.startsWith('/flow') ? (
        <LoggedOut>{children}</LoggedOut>
      ) : (
        <LoggedIn>{children}</LoggedIn>
      )} */}
      <LoggedOut>{children}</LoggedOut>
    </div>
  );
}
