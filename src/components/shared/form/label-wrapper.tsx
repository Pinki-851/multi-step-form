type LabelWrapperProp = {
  id: string;
  label: string;
  isDisabled?: boolean;
  disabledWithRequired?: boolean;
};

export function LabelWrapper(props: LabelWrapperProp) {
  const { label, id, isDisabled = false, disabledWithRequired = false } = props;
  return (
    <label
      htmlFor={id}
      className={`${
        isDisabled || disabledWithRequired
          ? 'text-gray-400 dark:text-dark-gray-50'
          : 'text-gray-600 dark:text-dark-gray-60'
      }   text-med-body-sm `}
    >
      {label}
    </label>
  );
}
