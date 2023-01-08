/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "color-border": "#BDBDBD",
      "text-p-color": "#333333",
      "color-red": "rgb(220 38 38)",
      "color-white": "#fff",
      "color-btn": "#2F80ED",
      "color-black": "#222",
      "color-grey": "#F8F9FD",
      "color-grey-1": "#F2F2F2",
      "color-grey-2": "#E0E0E0",
      "color-grey-3": "#828282",
      "color-grey-4": "#4F4F4F",
    },

    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "850px" },
      // => @media (max-width: 850px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      backgroundImage:{
        "page-not-found": "url('../asset/img/pageNotFound.png')"
      }
    },
  },
  plugins: [],
};
