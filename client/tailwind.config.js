const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        fontFamily: {
          sans: ["Nunito", ...defaultTheme.fontFamily.sans],
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
