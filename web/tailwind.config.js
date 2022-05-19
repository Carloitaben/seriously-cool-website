module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      // mobileLandscape: "",
      // tablet: "",
      desktop: "770px",
      /** Max desktop size */
      desktopMax: "1291px",
      /** Breakpoint at witch the hamburger menu stops showing */
      menuVisible: "1116px",
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
