/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  // content: [
  //   "./src/pages/**/*.{js,ts,jsx,tsx}",
  //   "./src/components/**/*.{js,ts,jsx,tsx}",
  //   "./src/layout/**/*.{js,ts,jsx,tsx}",
  // ],
  theme: {
    extend: {
      colors: {
        "storm-default": "#575F66",
        "storm-hovered": "#097CE5",
        "storm-selected-v": "#086ECC",
        "storm-bglight": "#ECF5FD",
        "storm-selected-t": "#054580",
        "storm-completed": "8AC073",
        /*  */
        "storm-bgdefault": "#0B4A77",
        "storm-bghovered": "#3981B6",
        "storm-selected": "#0B4A77",
        "storm-secondary": "#1369A8",
        stormLight: "#0080e6",
        "neutral-100": "#DDE2E5",
        stormLightGray: "#C4C4C4",
      },
      maxHeight: {
        '128': "808px",
      },
    },
  },
  plugins: [],
};
