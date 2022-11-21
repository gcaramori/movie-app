const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    screens: {
      'base': '340px',
      // => @media (min-width: 360px) { ... }
      
      'sm': '420px',
      // => @media (min-width: 360px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-wi  dth: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      main: ['Quicksand', 'sans-serif'],
    },
    colors: {
      'background': "#191d1f",
      'mainRed': "#d63031",
      'mint': "#00b894",
      'backgroundLight': "#636e72",
      'darkGray': '#1a171e',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,
      teal: colors.teal
    }
  },
  plugins: [],
}