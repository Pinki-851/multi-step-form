import { HTMLAttributes, ReactNode } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { FormFieldWrapper } from './form-field-wrapper';
import { LabelWrapper } from './label-wrapper';
import { RequiredFieldWrapper } from './required-field-wrapper';

export interface InputFieldWrapperProps extends HTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  className?: string;
  error?: string | undefined | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | any;
  type?: 'text' | 'number' | 'radio' | 'date' | 'url' | 'password';
  value?: string;
  register: any;
  label: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  pattern?: any;
  helperText?: string | ReactNode;
}

export function InputFieldWrapper(props: InputFieldWrapperProps) {
  const {
    className = '',
    error,
    type = 'text',
    label,
    placeholder,
    isRequired = false,
    isDisabled = false,
    register,
    helperText = '',
    ...rest
  } = props;

  return (
    <FormFieldWrapper className={className}>
      {isRequired ? (
        <RequiredFieldWrapper isDisabled={isDisabled}>
          <LabelWrapper label={label} id={label} disabledWithRequired={isDisabled} />
        </RequiredFieldWrapper>
      ) : (
        <LabelWrapper label={label} id={label} isDisabled={isDisabled} />
      )}

      <input
        type={type}
        id={label}
        placeholder={placeholder}
        disabled={isDisabled}
        spellCheck={false}
        {...register}
        {...rest}
        className={`${error && '!ring-red-600 dark:!ring-red-500'}`}
      />
      {helperText && <p className='text-gray-600 text-body-sm dark:text-gray-70'>{helperText}</p>}
      {error && (
        <div className='text-red-600 text-body-sm dark:text-red-400'>{error as string}</div>
      )}
    </FormFieldWrapper>
  );
}
