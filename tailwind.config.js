/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				pastel: {
					bg: '#FAF7F5',
					primary: '#C9B6E4',
					secondary: '#B8E3D6',
					tertiary: '#F4C6D1',
					text: '#3A3A3A',
					muted: '#666666',
					border: 'rgba(58, 58, 58, 0.1)',
					card: 'rgba(255, 255, 255, 0.65)',
				}
			},
			backdropBlur: {
				sm: '4px',
			},
		},
		},
	plugins: [],
}
