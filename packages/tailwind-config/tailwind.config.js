import plugin from 'tailwindcss/plugin'

/** @type {import("tailwindcss").Config} */
export default {
  darkMode: 'media',

  theme: {
    colors: {
      midnight: '#0a0a0a',
      gold: '#dfc5aa',
      dirt: '#e3d5c7',
      body: { DEFAULT: '#444', light: '#777', dark: '#222' },
      black: '#000',
      white: '#fff',
    },
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 0 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
    fontFamily: {
      display: ['the-seasons', 'sans-serif'],
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': value => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      )
    }),
  ],
}
