import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
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
				light: {
					primary: "#6C91C2",
					secondary: "#A8D5BA",
					background: "#F0F4F8",
					text: "#333333",
					accent: "#F9E784",
					muted: "#E2E8F0",
				},
				dark: {
					primary: "#4A6A9B",
					secondary: "#789E7D",
					background: "#1A1A2E",
					text: "#F0F4F8",
					accent: "#E3D17A",
					muted: "#4A5568",
				},
			},
		},
	},
	plugins: [],
};
export default config;
