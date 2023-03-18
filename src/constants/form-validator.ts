export const Validation_constant = {
  MOBILE_NUMBER: {
    value: /^[1-9]{1}[0-9]{9}$/,
    message: 'Invalid mobile number',
  },
  EMAIL_ID: {
    value:
      // eslint-disable-next-line no-control-regex
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    message: 'Invalid Email ID',
  },
  PASSWORD: {
    value: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
    message: 'Minimum 8 characters, atleast one letter,one digit and one special character',
  },
  ALPHA_NUMERIC: {
    value: /^[a-zA-Z0-9 ]+$/,
    message: 'only characters and digits allowed',
  },
  ALPHABETS: {
    value: /^[a-zA-Z ]+$/,
    message: 'only characters allowed',
  },
};
