import { AnimationObject } from 'lottie-react-native';

export interface OnboardingData {
	id: number;
	animation: AnimationObject;
	text: string;
	desc: string;
	textColor: string;
	backgroundColor: string;
}

export const DataOB: OnboardingData[] = [
	{
		id: 1,
		animation: require('../assets/animations/mountain.json'),
		text: 'Discover Your Altitude Readiness',
		textColor: '#005b4f',
		backgroundColor: '#ffa3ce',
		desc: "Welcome to AltitudeGuard, your trusted companion for assessing your readiness to ascend to high altitudes. Whether you're a trekker, traveler, or sports enthusiast, we've got you covered. Let's ensure a safe and enjoyable journey together!",
	},
	{
		id: 2,
		animation: require('../assets/animations/climbb.json'),
		text: 'Personalized AMS Assessment',
		textColor: '#1e2169',
		backgroundColor: '#bae4fd',
		desc: "Our assessment process helps you understand your risk of Acute Mountain Sickness (AMS) at high altitudes. Answer a few questions about your health, experience, and travel plans. We'll calculate your AMS risk score and provide tailored recommendations.",
	},
	{
		id: 3,
		animation: require('../assets/animations/health.json'),
		text: 'Stay Informed, Stay Safe',
		textColor: '#fff',
		backgroundColor: '#FF6F61',
		desc: 'Disclaimer: This content including advice provides generic information only. It is in no way a substitute for qualified medical opinion. Always consult a specialist or your own doctor for more information.',
	},
];
