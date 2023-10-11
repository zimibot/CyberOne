const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.{js,jsx,ts,tsx}",
    "./build/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      // use colors only specified
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      black: "#000",
      transparent: "transparent",
      primary: "#00A3FF",
      secondary: "fff",
      btn_primary: "#00A3FF",
      border_primary: "rgba(255, 255, 255, 0.2)",
      succes_primary: "#00A3FF",
      pending_primary: "#F4BF4E",
      error_primary: "#ED6A5E",
      backround_primary: "#1B1B1B",
      backround_secondary: "#2B2B2B",
      frame: "#262626",
      white_input: 'rgba(255, 255, 255, 0.3)',
      dark_input: 'rgba(47, 47, 47, 0.5)',
    },
    extend: {},
  },
  plugins: [],
}