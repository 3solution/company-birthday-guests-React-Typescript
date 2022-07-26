/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      phone: "320px",
      phoneLandscape: "480px",
      tablet: "768px",
      desktop: "1025px",
      large: "1260px",
      xl: "1440px",
      xxl: "1620px",
    },
  },
  plugins: [],
}
