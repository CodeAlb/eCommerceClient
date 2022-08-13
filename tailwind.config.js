const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: colors.stone,
      },
      maxWidth: {
        site: '1200px',
        inner: '1100px',
      },
      transitionDuration: {
        250: '250ms',
      },
      fontSize: {
        xxs: '11px',
      },
    },
    fontFamily: {
      sans: [
        'Jost',
        'Manrope',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
      spinner: {
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
