const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: {
        DEFAULT: '#09090a'
      },
      white: colors.white,
      primary: {
        light: '#996dff',
        DEFAULT: '#8257e5',
        dark: '#28203e',
        hover: '#9466ff',
        border: '#6833e4',
        shape: '#734bd1',
      },
      shape: {
        DEFAULT: '#202024',
        hover: '#29292e',
        dark: '#3c3c42'
      },
      background: {
        DEFAULT: '#121214'
      },
      text: {
        DEFAULT: '#a8a8b3'
      },
      green: {
        DEFAULT: '#04d361'
      },
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      teal: colors.teal,
      gray: colors.gray,
      blue: {
        ...colors.blue,
        discord: '#5865f2',
        discord_hover: '#626ef3'
      }

    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
