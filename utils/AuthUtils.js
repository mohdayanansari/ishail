import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export const SignInWithEmailAndPassword = async ({ email, password }) => {
	console.log('Logging In User...[Auth_Utils]: ', email, password);
	try {
		const response = await LoginUser(auth, email, password);
		if (response.user) {
			console.log('Login successful...[Auth_Utils]: ', response);
			try {
				const user = JSON.stringify(response.user);
				await AsyncStorage.setItem('user', user);
				await AsyncStorage.setItem('isLogin', 'true');
			} catch (error) {
				console.log(
					'Error in setting data while login in local storage'
				);
			}
			// await AsyncStorage.setItem('role', JSON.stringify(response.user?.role));
			return {
				success: true,
				message:
					'User Login successfully! You are redirecting to Home screen',
				user: response.user,
			};
		}
	} catch (error) {
		console.log('Login Failed...[Auth_Utils]: ', error);
		return {
			success: false,
			message: error.code,
			user: null,
		};
	}
};

export const LogoutUser = async () => {
	try {
		await auth().signOut();
		AsyncStorage.clear();
		return {
			success: true,
			message: 'user logout successfully',
		};
	} catch (error) {
		console.log('Error in logging out user...[Auth_Utils]: ', error);
		return {
			success: false,
			message: 'user logout error',
		};
	}
};

export const CreateAccount = async ({ email, password }) => {
	console.log('Registering User...[Auth_Utils]: ', email, password);
	try {
		const response = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		if (response.user) {
			try {
				await addDoc(collection(db, 'users'), {
					abrName: '',
					fname: '',
					lname: '',
					age: '',
					gender: '',
					weight: '',
					height: '',
					email,
					phone: '',
					emergencyContact: '',
					addressLine1: '',
					addressLine2: '',
					state: '',
					city: '',
					postalCode: '',
					createdAt: firestore.Timestamp.fromDate(new Date()),
					userImg: null,
					role: 'user',
				});
				console.log(
					'User created successfully with details!...[Auth_Utils]'
				);
				return {
					success: true,
					message:
						'User created successfully! You are redirecting to login screen',
					user: response.user,
				};
			} catch (error) {
				console.log(
					'Error in registering user with firestore details...[Auth_Utils]: ',
					error
				);
				return {
					success: false,
					message: `Error: ${error.code}`,
					//   user: username,
				};
			}
		}
	} catch (error) {
		console.log('Registering User Failed...[Auth_Utils]: ', error);
		return {
			success: false,
			message: error.code,
			//   user: username,
		};
	}
};

export const LoginWithGoogle = async () => {
	try {
		// Check if your device supports Google Play
		await GoogleSignin.hasPlayServices({
			showPlayServicesUpdateDialog: true,
		});
		// Get the users ID token
		const { idToken } = await GoogleSignin.signIn();
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);
		return await auth()
			.signInWithCredential(googleCredential)
			.then(async (res) => {
				const user = await firestore()
					.collection('users')
					.doc(res.user.uid)
					.get();
				console.log('User Exist::', user.exists);
				if (!user.exists) {
					await firebase.auth().onAuthStateChanged(async (user) => {
						await firestore()
							.collection('users')
							.doc(auth().currentUser.uid)
							.set({
								abrName: '',
								fname: '',
								lname: '',
								age: '',
								gender: '',
								weight: '',
								height: '',
								email: res.user.email || '',
								phone: '',
								emergencyContact: '',
								addressLine1: '',
								addressLine2: '',
								state: '',
								city: '',
								postalCode: '',
								userImg: null,
								role: 'user',
							});
					});
				}
				try {
					const user = JSON.stringify(res.user);
					await AsyncStorage.setItem('user', user);
					await AsyncStorage.setItem('isLogin', 'true');
					console.log('Google login successful!');
					return {
						success: true,
						message:
							'Google Login successfully! You are redirecting to Home screen',
						user: res.user,
					};
				} catch (error) {
					console.log(
						'Error in setting data while login in local storage'
					);
				}
			})
			.catch((err) => {
				console.log(
					'Getting error on saving the data of user after login from google:: ',
					err
				);
				return {
					success: false,
					message: err?.code,
					user: null,
				};
			});
	} catch (error) {
		console.log('Error while logging in with Google', error);
		return {
			success: false,
			message: error?.code,
			user: null,
		};
	}
};
