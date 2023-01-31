/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				Inter: ['Inter', 'sans-serif']
			},
			width: {
				sm: '16em',
				md: '24em',
				lg: '32em'
			}
		}
	},
	plugins: []
}
