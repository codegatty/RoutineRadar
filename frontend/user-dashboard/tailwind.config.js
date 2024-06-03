/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#0f172a",
        "secondary":"#1e293b",
        "input":"#13283f",
        "app-blue":"#0ea5e9",
        "app-light-blue":"#5881a8",
        'scrollbar-thumb': '#4A5568', // Customize the scrollbar thumb color
        'scrollbar-track': '#E2E8F0', // Customize the scrollbar track color
      },
      textColor:{
        "primary":"#0ea5e9",
        "secondary":"#1e293b"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('flowbite/plugin')
  ],
}

