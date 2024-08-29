/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#17B794",
          "secondary": "#ffffff",
          "accent": "#ffffff",
          "neutral": "#ffffff",
          "base-100": "#22267B",
          "background-color": "#01005E",
        },
      },
      "syntwave",
    ],
  },
  theme: {
      extend: {
        boxShadow: {
          cardShadow: '0px 0px 120px 30px rgba(23, 183, 148, 0.45)',
        },
        colors: {
          customDeleteBtn: '#AE3838',
        }
      },
  },
  plugins: [require('daisyui'),],
}
