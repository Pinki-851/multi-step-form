import { ReactNode } from 'react';

interface CLProps {
  children: ReactNode;
  className?: string;
}
export function CardLayout(props: CLProps) {
  const { children, className = '' } = props;
  return (
    <div
      className={`bg-white sm:min-w-[50rem] rounded-[4px] p-[1.6rem] max-h-[90vh] overflow-y-auto shadow-extra-small ${className}`}
    >
      {children}
    </div>
  );
}
