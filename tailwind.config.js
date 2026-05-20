export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          950: "#020617",
          900: "#071430",
          800: "#0d1f38",
          700: "#12314e",
          500: "#0f4dba",
          400: "#3ea8ff",
          300: "#68c7ff",
        },
      },
      boxShadow: {
        glass: "0 18px 80px rgba(14,165,233,0.14)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
