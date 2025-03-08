import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable dark mode class strategy
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#ffff7a", // Yellow primary
          secondary: "#e6e64d", // Yellow secondary
          background: "#ffffff", // White background
          text: "#000000", // Black text
          accent: {
            grey: "#a3a3a3", // Grey accent
            darkGrey: "#424344", // Dark grey accent
          },
        },
        dark: {
          primary: "#a3a3a3", // Grey primary
          secondary: "#e0e0e0", // Light grey secondary
          background: "#121212", // Dark background
          text: "#ffffff", // White text
          accent: {
            grey: "#666666", // Dark grey accent
            lightGrey: "#e0e0e0", // Light grey accent
            darkHighlight: "#242424", // Dark highlight accent
          },
        },
        gradientLight: {
          start: "rgba(255, 253, 80, 0.75)", // #fffd50 with higher opacity
          medium: "rgba(204, 202, 64, 0.75)", // Darker yellow with higher opacity
          end: "rgba(153, 151, 48, 0.75)", // Even darker yellow with higher opacity
        },
        gradientDark: {
          start: "rgba(42, 45, 48, 0.9)", // #2a2d30 with higher opacity
          medium: "rgba(31, 34, 36, 0.9)", // Darker grey with higher opacity
          end: "rgba(21, 23, 24, 0.9)", // Even darker grey with higher opacity
        },
        
        
        
        
      },
      keyframes: {
        changeBackgroundColor: {
          "0%, 100%": { opacity: "1" },
          "16.67%": { opacity: "0.9" },
          "33.33%": { opacity: "0.8" },
          "50%": { opacity: "0.6" },
          "66.67%": { opacity: "0.5" },
          "83.33%": { opacity: "0.4" },
        },
      },
      animation: {
        changeBackgroundColor: "changeBackgroundColor 8s infinite alternate",
      },
      fontFamily: {
        Poppins: ["var(--font-Poppins)"], // Use variable font for Poppins
        Josefin: ["var(--font-Josefin)"], // Use variable font for Josefin Sans
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "1000px": "1000px",
        "1100px": "1100px",
        "1200px": "1200px",
        "1300px": "1300px",
        "1500px": "1500px",
        "800px": "800px",
        "400px": "400px",
      },
    },
  },
  plugins: [],
};

export default config;
