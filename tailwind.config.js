import dir from "tailwindcss-dir"

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
    center: true,
    padding: "1rem",
  },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4CAF50',
          light: '#80E27E',
          dark: '#087F23',
        },
      },
    },
  },
  plugins: [dir],

}