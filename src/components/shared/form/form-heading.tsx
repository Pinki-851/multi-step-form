import { ReactNode } from 'react';

type FormHeadingProps = {
  children: ReactNode;
  className?: string;
};
export function FormHeading(props: FormHeadingProps) {
  const { children, className = '' } = props;
  const baseStyle = ['text-bold-sub-02 text-blue-06 my-[1.6rem]', className].join(' ');
  return <h2 className={baseStyle}>{children}</h2>;
}
