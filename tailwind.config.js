/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        jade: {
          500: '#0fa47f',
          600: '#0d8c6d',
        },
      },
    },
  },
  plugins: [],
}
