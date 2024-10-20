/** @type {import('tailwindcss').Config} */
import tailwindcssAnimated from 'tailwindcss-animated';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Set Poppins as default sans-serif font
      },
    },
  },
  plugins: [
    tailwindcssAnimated
  ],
}
