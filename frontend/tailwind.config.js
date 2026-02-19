/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B2635',
          dark: '#6D1E2A',
          light: '#A83244',
        }
      }
    },
  },
  plugins: [],
}
