module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--theme-colors-background)",
        accent: "var(--theme-colors-accent)",
      },
      spacing: {
        slidingTextDesktop: "3.125rem",
      },
    },
  },
  plugins: [],
}
