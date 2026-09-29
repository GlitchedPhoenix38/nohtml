import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050713",
        night: "#080B18",
        mist: "rgba(255,255,255,0.08)",
        cyanGlow: "#5DE8FF",
        violetGlow: "#8D6BFF",
        emeraldGlow: "#55F1B8",
        roseGlow: "#FF6AA2"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "0 0 80px rgba(93, 232, 255, 0.18)",
        card: "0 24px 80px rgba(0, 0, 0, 0.38)"
      },
      backgroundImage: {
        "radial-noise":
          "radial-gradient(circle at 18% 20%, rgba(93,232,255,0.18), transparent 28%), radial-gradient(circle at 78% 8%, rgba(141,107,255,0.18), transparent 26%), radial-gradient(circle at 70% 82%, rgba(85,241,184,0.13), transparent 28%)"
      }
    }
  },
  plugins: []
};

export default config;
