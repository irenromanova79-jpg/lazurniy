/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        ink: "#1e293b",
        navy: "#334155",
        bronze: "#b45309",
        gold: "#c79a3a",
      },
    },
  },
  plugins: [],
};
