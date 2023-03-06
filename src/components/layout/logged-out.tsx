import { LayoutProps } from '.';

export function LoggedOut(props: LayoutProps) {
  const { children } = props;
  return <main className='flex justify-center h-screen items-center bg-blue-05 '>{children}</main>;
}
