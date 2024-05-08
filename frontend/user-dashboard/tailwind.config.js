/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#0f172a",
        "secondary":"#1e293b",
        "input":"#13283f"
      },
      textColor:{
        "primary":"#0ea5e9"
      }
    },
  },
  plugins: [],
}

