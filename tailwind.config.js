/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        default: "#F5F5F5",
        secondary: "#858585",
        link: "#346BD4",
      }
    },
  },
  plugins: [],
}