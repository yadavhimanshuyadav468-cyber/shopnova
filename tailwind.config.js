/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f6ff',
          100: '#e9efff',
          200: '#d7e3ff',
          300: '#bfd0ff',
          400: '#8ea9ff',
          500: '#5d7cf7',
          600: '#385ad9',
          700: '#2d48b2',
          800: '#273f8d',
          900: '#23356d',
        },
        accent: {
          500: '#ff8a3d',
          600: '#f26f1d',
        },
      },
      boxShadow: {
        soft: '0 20px 50px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
};
