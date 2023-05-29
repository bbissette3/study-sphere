/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        black: "#000000",
        darkBlue: "#172554",
        lightBlue: "#88a7bb",
        whiteBlue: "#c8d6df",
        blue: "#57769e",
        mediumBlue: "#5d839c",
        darkGray: "#2e3031",
        brown: "#746f65",
        tan: "#b5b2a3",
        beige: "#b9b6af",
        pureWhite: "#ffffff",
      },
    },
  },
  plugins: [],
};
