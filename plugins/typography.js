/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');

const Typography = plugin(function ({ addUtilities }) {
  const typographyUtilities = {
    '.text-reg-H3': {
      fontSize: '3.2rem', // 32px
      fontWeight: '400', // normal
      lineHeight: '138%', // 44px
    },
    '.text-reg-H4': {
      fontSize: '2.4rem', // 24px
      fontWeight: '400', // normal
      lineHeight: '150%', // 36px
    },
    '.text-reg-sub-01': {
      fontSize: '1.8rem', // 18px
      fontWeight: '400', // normal
      lineHeight: '167%', // 30px
    },
    '.text-reg-sub-02': {
      fontSize: '1.6rem', // 16px
      fontWeight: '400', // normal
      lineHeight: '150%', // 24px
    },
    '.text-reg-body': {
      fontSize: '1.4rem', // 14px
      fontWeight: '400', // normal
      lineHeight: '143%', // 20px
    },
    '.text-reg-body-sm': {
      fontSize: '1.2rem', // 12px
      fontWeight: '400', // normal
      lineHeight: '150%', // 18px
    },
    '.text-reg-body-xs': {
      fontSize: '1rem', // 10px
      fontWeight: '400', // normal
      lineHeight: '120%', // 12px
    },
    // MEDIUM
    '.text-med-H1': {
      fontSize: '6.4rem', // 64px
      fontWeight: '500', // medium
      lineHeight: '125%', // 80px
    },
    '.text-med-H2': {
      fontSize: '4.8rem', // 48px
      fontWeight: '500', // medium
      lineHeight: '125%', // 60px
    },
    '.text-med-H3': {
      fontSize: '3.2rem', // 32px
      fontWeight: '500', // medium
      lineHeight: '138%', // 44px
    },
    '.text-med-H4': {
      fontSize: '2.4rem', // 24px
      fontWeight: '500', // medium
      lineHeight: '150%', // 36px
    },
    '.text-med-sub-01': {
      fontSize: '1.8rem', // 18px
      fontWeight: '500', // medium
      lineHeight: '167%', // 30px
    },
    '.text-med-sub-02': {
      fontSize: '1.6rem', // 16px
      fontWeight: '500', // medium
      lineHeight: '150%', // 24px
    },
    '.text-med-body': {
      fontSize: '1.4rem', // 14px
      fontWeight: '500', // medium
      lineHeight: '143%', // 20px
    },
    '.text-med-body-sm': {
      fontSize: '1.2rem', // 12px
      fontWeight: '500', // medium
      lineHeight: '150%', // 18px
    },
    '.text-med-body-xs': {
      fontSize: '1rem', // 10px
      fontWeight: '500', // medium
      lineHeight: '120%', // 12px
    },
    // BOLD
    '.text-bold-H4': {
      fontSize: '2.4rem',
      fontWeight: '600',
      lineHeight: '150%',
    },
    '.text-bold-sub-01': {
      fontSize: '1.8rem',
      fontWeight: '600',
      lineHeight: '167%',
    },
    '.text-bold-sub-02': {
      fontSize: '1.6rem',
      fontWeight: '600',
      lineHeight: '150%',
    },
    '.text-bold-body': {
      fontSize: '1.4rem', // 14px
      fontWeight: '600', // bold
      lineHeight: '143%', // 20px
    },
  };
  addUtilities(typographyUtilities, ['responsive', 'hover']);
});

module.exports = Typography;
