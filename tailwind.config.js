/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./App.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		'./app/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				app1: '#AEAFF7',
				app2: '#E55E76',
				app3: '#371B34',
				app4: '#1C1B1F',
				app5: '#FCDDEC',
				app6: '#F09A59',
				app7: '#EF5DA8',
				app8: '#A0E3E2',
				app9: '#F09E54',
				app10: '#CDD2F6',
				app11: '#CBE8A6',
				app_white: '#f3f3f3',
				app_white2: '#F8F8F8',
			},
		},
	},
	plugins: [],
};
