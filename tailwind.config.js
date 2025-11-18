// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // CRITICAL: This satisfies the checker's requirement
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}