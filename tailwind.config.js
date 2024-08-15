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
        
      },
  },
  plugins: [require('daisyui'),],
}
