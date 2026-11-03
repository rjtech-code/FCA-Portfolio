export default {
  darkMode: "class",
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
        // Vultus Go (vultusgo.in) theme colours — values come from CSS
        // variables in index.css so the light/dark toggle keeps working.
        page: "rgb(var(--c-page) / <alpha-value>)",
        card: "rgb(var(--c-card) / <alpha-value>)",
        tile: "rgb(var(--c-tile) / <alpha-value>)",
        soft: "rgb(var(--c-soft) / <alpha-value>)",
        fg: {
          DEFAULT: "rgb(var(--c-fg) / <alpha-value>)",
          muted: "rgb(var(--c-fg-muted) / <alpha-value>)",
          subtle: "rgb(var(--c-fg-subtle) / <alpha-value>)",
        },
        line: "rgb(var(--c-line) / <alpha-value>)",
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
