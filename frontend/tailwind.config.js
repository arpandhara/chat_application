// import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */

export default{
  // This line is crucial! It tells Tailwind where to look for your classes.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'border': 'border 4s linear infinite',
      },
      keyframes: {
        'border': {
          to: { '--border-angle': '360deg' },
        }
      }                      
    },
  },
  plugins: [],
}