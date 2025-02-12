/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        customGreen :'#64B496',
        primary:{
          DEFAULT: '#ff4646',  // Main primary color
          20: 'rgba(255, 70, 70, 0.2)', // Custom transparency
          50: 'rgba(255, 70, 70, 0.5)',
        }
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
};
