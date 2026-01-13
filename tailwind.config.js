/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#8B1538", // Deep Maroon
        secondary: "#2D3436", // Dark Slate
        accent: "#E74C3C", // Bright Red
        "accent-light": "#FF6B6B", // Light Red
        "accent-dark": "#C0392B", // Dark Red
        background: "#FAFAFA", // Off-white
        dark: "#1A1A1A", // Near Black
        muted: "#6C757D", // Muted Gray
      },
    },
  },
  plugins: [],
};
