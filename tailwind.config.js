/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				"background-light": "hsl(var(--background-light))",
				"background-bright": "hsl(var(--background-bright))",
				foreground: "hsl(var(--foreground))",
				"foreground-dim": "hsl(var(--foreground-dim))",
				"foreground-dark": "hsl(var(--foreground-dark))",
				accent: "hsl(var(--accent))"
			},
			padding: {
				clamp: "var(--pad-x)"
			},
			maxWidth: {
				clamp: "var(--clamp)"
			},
			animation: {
				cursor: "cursor 1.4s infinite"
			}
		}
	},
	plugins: []
};
