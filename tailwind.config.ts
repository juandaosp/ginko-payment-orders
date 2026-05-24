import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        ginko: {
          DEFAULT: "#e04172",
          hover: "#c93560",
          light: "#fdf2f5",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
