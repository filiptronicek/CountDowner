module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 3px 12px rgba(0, 0, 0, 0.48)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
