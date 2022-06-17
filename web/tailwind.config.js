module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: "640px",
      desktop: "770px",
    },
    extend: {
      borderRadius: {
        "4xl": "2rem",
      },
      spacing: {
        18: "4.5rem",
      },
      colors: {
        background: "var(--theme-colors-background)",
        text: "var(--theme-colors-text)",
        card: "var(--theme-colors-card)",
      },
    },
  },
  plugins: [],
}
