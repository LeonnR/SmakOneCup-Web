/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '900': '900px'
      },
      colors: {
        'purple-bg': '#0B0128'
      },
      fontFamily: {
        'plusjakartasans': ['Plus Jakarta Sans', 'sans-serif'],
        'bebasneue': ['Bebas Neue']
      },
      boxShadow: {
        '3xl': '0 0 30px 6px',
      }
    },
  },
  plugins: [],
}
