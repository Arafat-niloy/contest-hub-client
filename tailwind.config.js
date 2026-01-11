/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4C4C', // Main Brand Color
        secondary: '#1E293B', // Dark contrast
        accent: '#FACC15', // Highlight
      }
    },
  },
  // daisyUI theme setup for Light/Dark mode
  daisyui: {
    themes: ["light", "dark"],
  },
  plugins: [require("daisyui")],
}