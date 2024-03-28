module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      fontSize: {
        14: "14px",
      },
      colors: {
        // Primary colors
        primary: "var(--color-primary) !important",
        "primary-text": "var(--color-primary-text) !important",

        // Secondary colors
        secondary: "var(--color-secondary) !important",
        "secondary-text": "var(--color-secondary-text) !important",

        // Background colors
        background: "var(--color-background) !important",
        "background-text": "var(--color-background-text) !important",

        // Surface colors
        surface: "var(--color-surface) !important",
        "surface-text": "var(--color-surface-text) !important",

        // Success, Warning, Error colors
        success: "var(--color-success) !important",
        warning: "var(--color-warning) !important",
        error: "var(--color-error) !important",

        // Neutral colors
        neutral100: "var(--color-neutral-100) !important",
        neutral200: "var(--color-neutral-200) !important",
        neutral300: "var(--color-neutral-300) !important",
        neutral400: "var(--color-neutral-400) !important",
        neutral500: "var(--color-neutral-500) !important",
        neutral600: "var(--color-neutral-600) !important",
        neutral700: "var(--color-neutral-700) !important",

        // Accent colors
        accent1: "var(--color-accent-1) !important",
        accent2: "var(--color-accent-2) !important",
      },
      boxShadow: {
        no: "none",
      },
      borderWidth: {
        1: "1px",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      },
      backgroundImage: {
        "hero-pattern":
          "url('https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/main/static/media/welcome-bg-2x-svg.25338f53.svg')",
      },
    },
  },
  plugins: [],
};
