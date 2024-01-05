/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				rubik: ['Rubik', 'sans-serif'],
				itim: ['Itim', 'cursive'],
				delius: ['Delius', 'cursive']
			},
		},
	},
	plugins: [],
}
