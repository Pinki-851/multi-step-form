import { ReactNode } from 'react';
interface RequiredFieldWrapperProps {
  children: ReactNode;
  isDisabled?: boolean;
}

export function RequiredFieldWrapper(props: RequiredFieldWrapperProps) {
  const { children, isDisabled } = props;
  return (
    <div>
      {children}
      <sup
        className={` ${
          isDisabled ? 'text-gray-400 dark:text-gray-500' : 'text-red-600 dark:text-red-500'
        } text-med-body-sm  `}
      >
        *
      </sup>
    </div>
  );
}
