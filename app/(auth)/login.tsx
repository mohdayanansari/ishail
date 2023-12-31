import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	Image,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	ToastAndroid,
	TouchableOpacity,
	View,
} from 'react-native';

// icons

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { LinearGradient } from 'react-native-svg';
import FormInput from '../../components/FormInput';
import { auth } from '../../firebaseConfig';
import { googleLogin, login } from '../../store/actions/auth.actions';
import { SignInWithEmailAndPassword } from '../../utils/AuthUtils';

type ScreenProps = {
	navigation: NavigationProp<any, 'Signup'>; // Replace 'RootStackParamList' with your actual stack param list type
};

// type ErrorType = {
//   email: string;
//   password: string;
//   cpassword: string;
//   error: string;
// };

const { width, height } = Dimensions.get('window');

const LoginScreen: React.FC<ScreenProps> = ({ navigation }) => {
	//   const isUserLoggingIn = useSelector(state => state.auth?.isUserLoggingIn);
	//   const userLogin = useSelector(state => state.auth?.message);
	//   const isLoggedIn = useSelector(state => state.auth?.isLoggedIn);
	//   const dispatch = useDispatch();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showError, setShowError] = useState<boolean>(false);
	const [errors, setErrors] = useState({});

	// handle Errors
	const getErrors = (email, password) => {
		const errors = {};
		if (!email) {
			errors.email = 'Please enter a email';
		} else if (!email.includes('@') || !email.includes('.com')) {
			errors.email = 'Please enter a valid email';
		}

		if (!password) {
			errors.password = 'Please Enter Password!';
		} else if (password.length < 8) {
			errors.password = 'Your password must be at least 8 characters.';
		}
		return errors;
	};

	// handle create user
	const handleLoginForm = async () => {
		const errors = getErrors(email, password);
		if (Object.keys(errors).length > 0) {
			setShowError(true);
			setErrors(showError && errors);
			console.log('Error: ' + errors);
		} else {
			setErrors({});
			setShowError(false);
			console.log('Login...');
			// handleLogin(email, password);
			console.log('Logging In User...[Auth_Utils]: ', email, password);
			try {
				const response = await signInWithEmailAndPassword(
					auth,
					email,
					password
				);
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
		}
	};

	const handleGoogleLogin = async () => {
		console.log('Google login clicked');
		// dispatch(googleLogin());
	};

	//   useEffect(() => {
	//     if (isLoggedIn) {
	//       ToastAndroid.show('Sign In Successful!', ToastAndroid.LONG);
	//     }
	//   }, [isLoggedIn]);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
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
	}, []);

	return (
		<View className='relative flex-1 bg-white'>
			<StatusBar translucent backgroundColor='transparent' />
			{/* Header container */}
			<View className='flex-row h-[40%] items-end pb-[20px] '>
				<View className='absolute top-[-80px] left-[-50px]'>
					{/* <UpperDesign width={width * 1.8} height={400} /> */}
				</View>

				<View className='w-[60%] pl-[20px] '>
					<Text className='text-[30px] text-app4 font-bold'>
						Sign In
					</Text>
					<Text className='text-app4/50 text-[14px] mt-[10px]'>
						Welcome to i-Shail 🌄
					</Text>
					<Text className='text-app4/50 text-[14px] mt-[10px]'>
						i-Shail is here to make your high-altitude adventures
						memorable and secure. Whether you're a trekker,
						traveler, or thrill-seeker, our app ensures that you're
						prepared for every ascent.
					</Text>
					<Text className='text-app4/50 text-[14px] mt-[10px]'>
						Get ready to assess your AMS risk, and conquer new
						altitudes with confidence. Let's make every step of your
						journey an amazing experience.
					</Text>
				</View>
				<View className='w-[40%] items-end '>
					{/* <Image
						source={require('../../assets/vectors/healthiconsmix.png')}
						className='w-[200px] h-[200px]'
					/> */}
				</View>
			</View>
			{/* Form container */}
			<ScrollView className='h-[60%] '>
				<View className=' px-[20px] pb-[20px]'>
					<Text className='text-app4/50 text-[14px] mt-[10px] mb-[20px]'>
						Login to your account and start your altitude readiness
						assessment today!
					</Text>
					<FormInput
						labelValue={email}
						// @ts-ignore
						onChangeText={(userEmail) => setEmail(userEmail)}
						placeholder='Enter your email address...'
						iconType='mail'
						keyboardType='email-address'
						autoCapitalize='none'
						autoCorrect={false}
					/>
					{errors.email && (
						<Text className='text-rose-700 text-[12px] font-bold animate-pulse mb-[10px] ml-[10px] mt-[-15px]'>
							{errors.email}
						</Text>
					)}
					<View className='relative flex-row items-center justify-end w-full'>
						<FormInput
							labelValue={password}
							// @ts-ignore
							onChangeText={(userPassword) =>
								setPassword(userPassword)
							}
							placeholder='Enter a strong password...'
							iconType='lock'
							secureTextEntry={!showPassword}
							maxLength={16}
						/>
						{password.length > 0 && (
							<TouchableOpacity
								activeOpacity={0.5}
								className='z-10  bg-black/10 absolute top-[8px] right-[10px] p-[5px] rounded-full'
								onPress={() => setShowPassword(!showPassword)}
							>
								<Ionicons
									name={showPassword ? 'eye' : 'eye-off'}
									size={22}
									color={'black'}
								/>
							</TouchableOpacity>
						)}
					</View>
					{errors.password && (
						<Text className='text-rose-700 text-[12px] font-bold animate-pulse mb-[10px] ml-[10px] mt-[-15px]'>
							{errors.password}
						</Text>
					)}
					{/* {userLogin && ( */}
					<Text className='text-rose-700 text-[12px] font-bold animate-pulse mb-[10px] ml-[10px] mt-[-15px]'>
						{/* {userLogin === 'auth/email-already-in-use' && 'Wrong Password!'} */}
						{/* {userLogin === 'auth/invalid-email' && 'Invalid Email!'} */}
						{/* {userLogin === 'auth/wrong-password' && 'Wrong Password!'} */}
						{/* {userLogin === 'auth/user-not-found' && 'User not found!'} */}
					</Text>
					{/* )} */}

					{/* {isUserLoggingIn ? (
            <ActivityIndicator size={'small'} color={'#E55E76'} />
          ) : (
            <TouchableOpacity
              className="h-[50px] bg-app1 rounded-[16px] justify-center items-center"
              onPress={() => handleLoginForm()}>
              <Text className="text-lg font-bold text-white">Take me In</Text>
            </TouchableOpacity>
        )} */}
					<TouchableOpacity
						className='h-[50px] bg-app1 rounded-[16px] justify-center items-center'
						onPress={() => handleLoginForm()}
					>
						<Text className='text-lg font-bold text-white'>
							Take me In
						</Text>
					</TouchableOpacity>
				</View>
				<View className='text-center '>
					<Link
						href={'/signup'}
						className='text-center font-semibold underline text-app4/80 mt-4'
					>
						Create a new account!
					</Link>
				</View>
				{/* Divider */}
				{/* <View className='flex-row items-center  justify-center px-[20px] gap-[5px]'>
					<LinearGradient
						start={{ x: 1, y: 0 }}
						end={{ x: 0.5, y: 1.0 }}
						colors={['#00000090', '#00000090', '#ffffff00']}
						className='flex-1 py-[1.4px] rounded-full'
					/>
					<Text className='text-black/50 text-[14px]'>
						Or continue with
					</Text>
					<LinearGradient
						start={{ x: 0, y: 0 }}
						// end={{x: 1, y: 0}}
						colors={['#00000090', '#00000090', '#ffffff00']}
						className='flex-1 py-[1.4px] rounded-full'
					/>
				</View> */}
				{/* Other login provider */}
				{/* <View className="flex-1 px-[20px]    max-h-max pt-[20px] ">
          {isUserLoggingIn ? (
            <View className="items-center justify-center">
              <Text className="text-sm text-black">
                We&apos;r logging you in with google...{' '}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => handleGoogleLogin()}
              className="h-[50px] bg-white rounded-[16px] justify-center items-center "
              style={styles.shadow}>
              <View className="flex-row gap-[10px] items-center">
                <GoogleIcon height={25} width={25} />
                <Text className="text-lg font-bold text-app4">
                  Continue with Google
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <View className="flex-row justify-center gap-[5px] mt-[30px]">
            <Text className="text-[16px] text-app4">
              Already have an account!
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text className="text-[16px] text-app1 font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View> */}
			</ScrollView>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.24,
		shadowRadius: 2.27,

		elevation: 10,
	},
});
