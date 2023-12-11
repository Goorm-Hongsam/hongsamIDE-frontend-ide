/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-color': '#04c92f',
        'main-dark-color': '#16b438',
        'ligth-gray': '#f3f3f3',
        'dark-gray-color': '#b0b0b0',
        'alert-color': '#ff6464',
      },
    },
  },
  plugins: [],
};
