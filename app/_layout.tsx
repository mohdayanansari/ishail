import { Stack, router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { auth } from '../firebaseConfig';
import { persistor, store } from '../store/store';

export default function Layout() {
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/auth.user
				const uid = user.uid;
				router.replace('/home');
				// ...
			} else {
				// User is signed out
				// ...
				router.push('/login');
			}
		});
		return unsubscribe;
	}, []);
	return (
		<>
			{/*         
		<StoreProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
			</PersistGate>
		</StoreProvider> */}
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: '#f4511e',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			>
				<Stack.Screen
					name='(auth)/login'
					options={{ title: 'Sign In' }}
				/>
				<Stack.Screen
					name='(auth)/signup'
					options={{ title: 'Sign up' }}
				/>
				<Stack.Screen
					name='index'
					options={{ title: 'Home', headerShown: false }}
				/>
				<Stack.Screen
					name='(drawer)'
					options={{ headerShown: false }}
				/>
			</Stack>
		</>
	);
}
