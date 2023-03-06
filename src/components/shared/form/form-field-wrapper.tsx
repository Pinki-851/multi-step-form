import { HTMLAttributes, ReactNode } from 'react';

export interface FieldWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function FormFieldWrapper(props: FieldWrapperProps) {
  const { children, className = '', ...rest } = props;

  return (
    <div {...rest} className={`flex flex-col justify-start gap-[.8rem] ${className}`}>
      {children}
    </div>
  );
}
