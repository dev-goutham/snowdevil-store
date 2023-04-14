/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        ltr: {
          '0%': {transform: 'translateX(-24px)'},
          '100%': {transform: 'translateX(0px)'},
        },
        rtl: {
          '0%': {transform: 'translateX(24px)'},
          '100%': {transform: 'translateX(0px)'},
        },
        ttb: {
          '0%': {transform: 'translateY(24px)'},
          '100%': {transform: 'translateY(0px)'},
        },
        btt: {
          '0%': {transform: 'translateY(-24px)'},
          '100%': {transform: 'translateY(0px)'},
        },
      },
      animation: {
        'move-ltr': 'ltr 300ms ease-in',
        'move-rtl': 'rtl 300ms ease-in',
        'move-ttb': 'ttb 300ms ease-in',
        'move-btt': 'btt 300ms ease-in',
      },
    },
    fontFamily: {
      sans: ['Inria Sans', 'sans-serif'],
    },
  },
  plugins: [
    require('tailwind-scrollbar')({nocompatible: true}),
    require('@tailwindcss/typography'),
  ],
  variants: {
    scrollbar: ['rounded'],
  },
};
