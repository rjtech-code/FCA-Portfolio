export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Legacy utility names intentionally resolve to the single brand accent.
        // Component surfaces and text are supplied by CSS theme tokens.
        sky: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        brand: {
          950: "#0a0a0a",
          900: "#111111",
          800: "#171717",
          700: "#262626",
          500: "#f97316",
          400: "#fb923c",
          300: "#fdba74",
        },
      },
      boxShadow: {
        glass: "0 18px 80px rgba(249,115,22,0.14)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
