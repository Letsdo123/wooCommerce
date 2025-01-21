/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        customGreen :'#64B496',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
};
