/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ["'Poppins'"],
    },
    extend: {
      boxShadow: {
        'extra-small': ' 0px 3px 4px -5px rgba(0, 0, 0, 0.03), 0px 1px 2px rgba(0, 0, 0, 0.04)',
        small: '0px 1px 1px rgba(0, 0, 0, 0.04), 0px 3px 4px rgba(0, 0, 0, 0.04)',
        medium: '0px 2px 4px -2px rgba(0, 0, 0, 0.06), 0px 4px 8px -2px rgba(0, 0, 0, 0.1)',
        large: '0px 2px 6px rgba(0, 0, 0, 0.06), 0px 32px 41px -23px rgba(0, 0, 0, 0.07)',
        'extra-large':
          '0px 48px 64px -36px rgba(0, 0, 0, 0.13), 0px 24px 48px -8px rgba(0, 0, 0, 0.11)',
      },
      colors: {
        blue: {
          '05': '#8192f2',
          '06': '#5c6bc0',
          '07': '#595af2',
          '08': '#4d4ef4',
          '09': '#3d3ef6',
        },
        gray: {
          '05': '#ede7f6',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('./plugins/typography')],
};
