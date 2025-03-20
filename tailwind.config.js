/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./public/*.{html,js}",
    flowbite.content(),
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary': '#7048EC',
      },
      backgroundImage: {
        'auth-bg': "url('./assets/backgrounds/authbg.svg')",
       
      }
    },
  },
  plugins: [flowbite.plugin()],
};
