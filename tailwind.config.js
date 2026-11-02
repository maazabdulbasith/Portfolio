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
        canvas: "#FAF7F2",
        surface: {
          0: "#FAF7F2",
          1: "#FFFFFF",
          2: "#F4EFEA",
          3: "#E8E2D8",
          4: "#DCD5C9",
        },
        accent: {
          DEFAULT: "#E0533C",
          dim: "rgba(224, 83, 60, 0.08)",
          border: "rgba(224, 83, 60, 0.22)",
          glow: "rgba(224, 83, 60, 0.18)",
          coral: "#FF6B4A",
          indigo: "#4F46E5",
          emerald: "#059669",
          amber: "#D97706",
          50: "#fdf2f0",
          100: "#fce2de",
          200: "#facac2",
          300: "#f6a79b",
          400: "#ee7766",
          500: "#E0533C",
          600: "#cb3720",
          700: "#ab2916",
          800: "#8c2415",
          900: "#752216",
        },
        txt: {
          primary: "#1C1917",
          secondary: "#475569",
          tertiary: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'var(--font-mono)', 'monospace'],
      },
      fontSize: {
        "hero": ["clamp(2.75rem, 6vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "section": ["clamp(1.75rem, 4vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "section-num": ["clamp(4rem, 8vw, 6.5rem)", { lineHeight: "1" }],
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
