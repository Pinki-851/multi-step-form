import { Fragment, useEffect, useState } from 'react';

interface StrengthCheckerProps {
  password: string;
}
export function StrengthChecker(props: StrengthCheckerProps) {
  const { password } = props;
  const [errorMsg, setErrorMsg] = useState('');
  const [strength, setStrength] = useState({
    poorPassword: false,
    weakPassword: false,
    strongPassword: false,
  });

  const poorRegExp = /[a-z]/;
  const weakRegExp = /(?=.*?[0-9])/;
  const strongRegExp = /(?=.*?[#?!@$%^&*-])/;
  const whitespaceRegExp = /\s+/;
  const poorPassword = poorRegExp.test(password);
  const weakPassword = weakRegExp.test(password);
  const strongPassword = strongRegExp.test(password);
  const whiteSpace = whitespaceRegExp.test(password);

  useEffect(() => {
    checkStrength();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  function checkStrength() {
    if (whiteSpace) {
      setErrorMsg('white space not allowed');
    } else if (password.length <= 3 && (poorPassword || weakPassword || strongPassword)) {
      setStrength({ ...strength, poorPassword: true });
      setErrorMsg('password is poor');
    } else if (password.length < 6 && (weakPassword || strongPassword)) {
      setErrorMsg('password is weak');
      setStrength({ ...strength, weakPassword: true, poorPassword: false });
    } else if (password.length >= 6 && poorPassword && weakPassword && strongPassword) {
      setErrorMsg('password is strong');
      setStrength({ ...strength, weakPassword: false, poorPassword: false, strongPassword: true });
    }
  }

  return (
    <Fragment>
      <div
        className={`${
          strength.weakPassword
            ? '!bg-orange-300 !block'
            : strength.strongPassword
            ? '!bg-green-500 !block'
            : '!bg-red-500 !block'
        } w-full h-[5px] hidden rounded-[4px] bg-transparent `}
      ></div>
      <p className='text-reg-body-sm'>{errorMsg}</p>
    </Fragment>
  );
}
