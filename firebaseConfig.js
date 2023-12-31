import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from 'firebase/auth';
// import {...} from "firebase/database";
import { getFirestore } from 'firebase/firestore';
// import {...} from "firebase/functions";
import { getStorage } from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyBJudHoyZrJSXMAiyvIU81mangSP450zGI',
	// databaseURL: 'https://project-id.firebaseio.com',
	authDomain: 'i-shail.firebaseapp.com',
	projectId: 'i-shail',
	storageBucket: 'i-shail.appspot.com',
	messagingSenderId: '443731726620',
	appId: '1:443731726620:web:9d1d781101d6563edaaad9',
	measurementId: 'G-L7EBKQWQPG',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
