/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			bg: "rgb(var(--bg) / <alpha-value>)",
			"light-bg": "rgb(var(--light-bg) / <alpha-value>)",
			primary: "rgb(var(--primary) / <alpha-value>)",
			secondary: "rgb(var(--secondary) / <alpha-value>)",
		},
		extend: {
			fontFamily: {
				sans: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [],
};
