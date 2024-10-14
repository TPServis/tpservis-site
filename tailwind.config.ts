import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        jaffa: {
          "50": "#fef6ee",
          "100": "#feead6",
          "200": "#fbd2ad",
          "300": "#f9b278",
          "400": "#f5853f",
          "500": "#f2661d",
          "600": "#e34c13",
          "700": "#bc3812",
          "800": "#962e16",
          "900": "#792815",
          "950": "#411109",
        },
        astral: {
          "50": "#f0f9fb",
          "100": "#d8eef5",
          "200": "#b6deeb",
          "300": "#83c4dd",
          "400": "#4aa3c6",
          "500": "#2e86ab",
          "600": "#296d91",
          "700": "#275a77",
          "800": "#284b62",
          "900": "#254054",
          "950": "#142938",
        },
        shark: {
          "50": "#f8f7f7",
          "100": "#f0eeee",
          "200": "#dddada",
          "300": "#bfbaba",
          "400": "#9b9595",
          "500": "#7f7879",
          "600": "#686162",
          "700": "#554f4f",
          "800": "#484445",
          "900": "#3f3b3b",
          "950": "#252323",
        },
        white: "#FBFFFE",
      },
      animation: {
        float: "float 10s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
