import { ReactNode } from 'react';

export function FormFieldGroupWrapper(props: { children: ReactNode; className?: string }) {
  const { children, className = '' } = props;
  return <div className={`grid grid-cols-1 gap-[1.6rem] ${className}`}>{children}</div>;
}
