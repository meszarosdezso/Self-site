import plugin from "tailwindcss/plugin";

/** @type {import("tailwindcss").Config} */
export default {
	darkMode: "media",

	theme: {
		colors: {
			midnight: { DEFAULT: "#0a0a0a", 5: "#161616", 10: "#2c2c2c" },
			gold: "#dfc5aa",
			dirt: "#e3d5c7",
			body: { DEFAULT: "#444", light: "#777", dark: "#222" },
			black: { DEFAULT: "#000" },
			white: "#fff",
		},
		extend: {
			textShadow: {
				sm: "0 1px 2px var(--tw-shadow-color)",
				DEFAULT: "0 0 4px var(--tw-shadow-color)",
				lg: "0 8px 16px var(--tw-shadow-color)",
			},
		},
		fontFamily: {
			display: ["the-seasons", "sans-serif"],
		},
		animation: {
			reveal: "reveal 1s ease-out forwards",
			"slide-in-right": "slideRight 250ms ease-out forwards",
			"fade-in": "fadeIn 150ms ease-out forwards",
		},
		keyframes: {
			fadeIn: {
				"0%": { opacity: 0 },
				"100%": { opacity: 1 },
			},
			slideRight: {
				"0%": { opacity: 0, transform: "translateX(40px)" },
				"100%": { opacity: 1, transform: "translateX(0px)" },
			},
			reveal: {
				"0%": {
					mask: "linear-gradient(90deg, #000 25%, #000000e6 50%, #00000000) 150% 0 / 400% no-repeat",
					opacity: ".2",
				},
				"100%": {
					mask: "linear-gradient(90deg, #000 25%, #000000e6 50%, #00000000) 0 / 400% no-repeat",
					opacity: "1",
				},
			},
		},
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					"text-shadow": (value) => ({
						textShadow: value,
					}),
				},
				{ values: theme("textShadow") },
			);
		}),
	],
};
