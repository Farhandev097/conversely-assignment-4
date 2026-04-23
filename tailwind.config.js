export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0d0f14",
        surface: "#14171f",
        surface2: "#1c2030",
        border: "#252a38",
        muted: "#6b7280",
        accent: "#6ee7b7",
        accent2: "#818cf8",
        p0: "#6ee7b7",
        p1: "#818cf8",
        p2: "#fbbf24",
        p3: "#f87171",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
    },
  },
  plugins: [],
};