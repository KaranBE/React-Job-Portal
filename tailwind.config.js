const sizes = {
  "6.6vmax": "6.6vmax",
  "33vh": "33vh",
  "40vh": "40vh",
  "57px": "57px",
  "60px": "60px",
  "66vh": "66vh",
  "83px": "83px",
  "1600px": "1600px",
};

module.exports = {
  important: true,
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: sizes,
      maxWidth: sizes,
      minHeight: sizes,
      colors: {
        blue: {
          400: "#14335C",
        },
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["focus"],
    },
  },
  plugins: [],
};
