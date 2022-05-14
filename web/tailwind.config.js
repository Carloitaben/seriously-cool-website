module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--theme-background)",
        accent: "var(--theme-accent)",
      },
      spacing: {
        slidingTextDesktop: "3.125rem",
      },
    },
  },
  plugins: [],
}
