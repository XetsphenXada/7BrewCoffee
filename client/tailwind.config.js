/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
  themes: [
    {
    sevenBrewTheme: {
      ...require("daisyui/src/theming/themes")["[data-theme=sevenBrewTheme]"],
      "primary": "#8a2432", //7Brew Maroon
      "secondary": "231F20", //7Brew Black
      "accent": "#37cdbe",
      "neutral": "#3d4451",
      "base-100": "#ffffff",
    },
  },
],
  },
  plugins: [
    require('daisyui'),
  ],
}
