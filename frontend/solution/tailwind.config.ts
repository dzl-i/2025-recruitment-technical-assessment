import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#e96321",
      },
    },
    screens: {
      lg: { max: "1440px" },
      md: { max: "1024px" },
      sm: { max: "640px" },
      xs: { max: "480px" },
    },
  },
  plugins: [],
} satisfies Config;
