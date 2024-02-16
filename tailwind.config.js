/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo[600],
        dbg: '#05061B',
        dcard: '#070E27',
      },
    },
  },
  plugins: [],
};
