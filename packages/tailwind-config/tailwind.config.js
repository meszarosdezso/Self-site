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
    animation: {
      reveal: 'reveal 1s ease-out forwards',
    },
    keyframes: {
      reveal: {
        '0%': {
          mask: 'linear-gradient(90deg, #000 25%, #000000e6 50%, #00000000) 150% 0 / 400% no-repeat',
          opacity: '.2',
        },
        '100%': {
          mask: 'linear-gradient(90deg, #000 25%, #000000e6 50%, #00000000) 0 / 400% no-repeat',
          opacity: '1',
        },
      },
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
