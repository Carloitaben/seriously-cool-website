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
