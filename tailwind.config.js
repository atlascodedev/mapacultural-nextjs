module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,tsx,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        250: 250,
        500: 500,
        1000: 1000,
      },
      colors: {
        primary: {
          main: "#FDECD0",
          light: "#FBF1E0",
          dark: "#FFD186",
        },
        secondary: {
          main: "#EC791E",
          light: "#FF8829",
          dark: "#AC5510",
        },
        tertiary: {
          main: "#718463",
          light: "#9BB48A",
          dark: "#42513A",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms")({ stratagy: "class" }),
  ],
};
