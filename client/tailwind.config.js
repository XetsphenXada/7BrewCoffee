/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
module.exports = {
  //...
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#8A2231", //7Brew Maroon
          "secondary": "231F20", //7Brew Black
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "dark"
    ],
  },
}
