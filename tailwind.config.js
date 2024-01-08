/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				gill: ['Gill Sans MT', 'Gill Sans', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
