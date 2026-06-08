/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          0: "#0a0a0a",
          1: "#111111",
          2: "#161616",
          3: "#1a1a1a",
          4: "#222222",
        },
        accent: {
          DEFAULT: "#F5A623",
          dim: "rgba(245, 166, 35, 0.10)",
          border: "rgba(245, 166, 35, 0.22)",
          glow: "rgba(245, 166, 35, 0.15)",
          50: "#fef9ee",
          100: "#fdf0d4",
          200: "#fadea8",
          300: "#f7c672",
          400: "#F5A623",
          500: "#f19012",
          600: "#e27508",
          700: "#bb5809",
          800: "#98450e",
          900: "#7c3a0f",
        },
        txt: {
          primary: "#e8e8e8",
          secondary: "#888888",
          tertiary: "#555555",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      fontSize: {
        "hero": ["clamp(3.5rem, 12vw, 9rem)", { lineHeight: "0.9", letterSpacing: "0.04em" }],
        "section": ["clamp(2.25rem, 5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "0.02em" }],
        "section-num": ["clamp(5rem, 12vw, 10rem)", { lineHeight: "1" }],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  plugins: [],
};
