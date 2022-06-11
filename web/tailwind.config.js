module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobileSub: { max: "360px" },
      // mobileLandscape: "",
      tablet: "640px",
      desktop: "770px",
      /** Max desktop size */
      desktopMax: "1921px",
      /** Breakpoint at witch the hamburger menu stops showing */
      menuContentVisible: "1116px",
    },
    extend: {
      borderRadius: {
        "4xl": "2rem",
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
