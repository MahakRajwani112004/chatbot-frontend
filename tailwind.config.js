import { heroui } from "@heroui/theme";
import tailwindColors from "tailwindcss/colors.js";
import colors from "./src/theme/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...tailwindColors,
      ...colors,
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
