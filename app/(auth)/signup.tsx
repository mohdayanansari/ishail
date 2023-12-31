import { NavigationProp } from '@react-navigation/native';
import { Link } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	Image,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import FormInput from '../../components/FormInput';
import { auth, db } from '../../firebaseConfig';
import { CreateAccount } from '../../utils/AuthUtils';

// icons

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

const SignupScreen: React.FC<ScreenProps> = ({ navigation }) => {
	//   const userLogin = useSelector(state => state.register?.message);
	//   const isUserLoggingIn = useSelector(state => state.auth?.isUserLoggingIn);

	//   const isUserRegistering = useSelector(
	//     state => state.register?.isUserRegistering,
	//   );
	//   const dispatch = useDispatch();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [cpassword, setCPassword] = useState<string>('');
	const [isRegistering, setIsRegistering] = useState<boolean>(false);
	const [showError, setShowError] = useState<boolean>(false);
	const [errors, setErrors] = useState({});

	// handle Errors
	const getErrors = (email, password, cpassword) => {
		const errors = {};
		if (!email) {
			errors.email = 'Please enter a email';
		} else if (!email.includes('@') || !email.includes('.com')) {
			errors.email = 'Please enter a valid email';
		}

		if (!password) {
			errors.password = 'Please Enter Password!';
		} else if (password.length < 8) {
			errors.password = 'Please enter password of minimum 8 characters';
		}
		if (!cpassword) {
			errors.cpassword = 'Please Enter Password!';
		} else if (cpassword.length < 8 || password !== cpassword) {
			errors.cpassword = 'Confirm Password must be same as password';
		}
		return errors;
	};

	// handle create user when user press create button
	const handleRegister = () => {
		setIsRegistering(true);
		const errors = getErrors(email, password, cpassword);

		if (Object.keys(errors).length > 0) {
			setShowError(true);
			setErrors(showError && errors);
			console.log('Error: ' + errors);
		} else {
			setErrors({});
			setShowError(false);
			console.log('Register...');
			handleSignUp(email, password);
		}
	};
	// create new user account along with all user details in firestore
	const handleSignUp = async (email: string, password: string) => {
		setIsRegistering(true);
		// dispatch(register(email, password, navigation));
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
			setIsRegistering(false);

			return {
				success: false,
				message: error.code,
				//   user: username,
			};
		}
	};

	// const handleGoogleLogin = async () => {
	// 	console.log('Google login clicked');
	// 	setIsRegistering(true);
	// 	dispatch(googleLogin());
	// 	setIsRegistering(false);
	// };

	return (
		<View className='relative flex-1 bg-white'>
			<StatusBar translucent backgroundColor='transparent' />
			{/* Header container */}
			<View className='flex-row h-[40%] items-end pb-[40px]'>
				<View className='absolute top-[-80px] left-[-50px]'>
					{/* <UpperDesign width={width * 1.8} height={400} /> */}
				</View>

				<View className='w-[60%] pl-[20px] '>
					<Text className='text-[30px] text-app4 font-bold'>
						Sign Up
					</Text>
					<Text className='text-app4/50 text-[14px] mt-[10px]'>
						i-Shail Check 🌟
					</Text>
					<Text className='text-app4/50 text-[14px] mt-[10px]'>
						Your High-Altitude Companion Awaits!
					</Text>
					<Text className='text-app4/50 text-[14px] mt-[10px]'>
						Welcome to i-Shail, your trusted partner for assessing
						your readiness to conquer new heights. No matter your
						destination, we're here to ensure your journey is safe,
						informed, and unforgettable.
					</Text>
				</View>
				<View className='w-[40%] items-end  '>
					{/* <Image
						source={require('../../assets/vectors/healthiconsmix.png')}
						className='w-[200px] h-[200px] '
					/> */}
				</View>
			</View>
			{/* Form container */}
			<ScrollView className='h-[60%] '>
				<View className=' px-[20px] pb-[20px]'>
					<Text className='text-app4/50 text-[14px] mt-[10px] mb-[20px] text-center'>
						Sign up now and let's begin your altitude journey!
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
					<FormInput
						labelValue={password}
						// @ts-ignore
						onChangeText={(userPassword) =>
							setPassword(userPassword)
						}
						placeholder='Enter a strong password...'
						iconType='lock'
						secureTextEntry
						maxLength={16}
					/>
					{errors.password && (
						<Text className='text-rose-700 text-[12px] font-bold animate-pulse mb-[10px] ml-[10px] mt-[-15px]'>
							{errors.password}
						</Text>
					)}
					<FormInput
						labelValue={cpassword}
						// @ts-ignore
						onChangeText={(userCPassword) =>
							setCPassword(userCPassword)
						}
						placeholder='Please confirm your password...'
						iconType='lock'
						secureTextEntry
						maxLength={16}
					/>
					{errors.cpassword && (
						<Text className='text-rose-700 text-[12px] font-bold animate-pulse mb-[10px] ml-[10px] mt-[-15px]'>
							{errors.cpassword}
						</Text>
					)}
					{/* {userLogin && (
						<Text className='text-rose-700 text-[12px] font-bold animate-pulse mb-[10px] ml-[10px] mt-[-15px]'>
							{userLogin === 'auth/email-already-in-use' &&
								'This email is already registered, please login...'}
						</Text>
					)} */}
					{/* {isUserRegistering ? (
						<ActivityIndicator size={'small'} color={'#E55E76'} />
					) : (
						<TouchableOpacity
							className='h-[50px] bg-app1 rounded-[16px] justify-center items-center'
							onPress={() => handleRegister()}
						>
							<Text className='text-lg font-bold text-white'>
								Create my account
							</Text>
						</TouchableOpacity>
					)} */}
					<TouchableOpacity
						className='h-[50px] bg-app1 rounded-[16px] justify-center items-center'
						onPress={() => handleRegister()}
					>
						<Text className='text-lg font-bold text-white'>
							Create my account
						</Text>
					</TouchableOpacity>
				</View>
				<View className='text-center '>
					<Link
						href={'/login'}
						className='text-center font-semibold underline text-app4/80 mt-4'
					>
						Already have an account! Login...
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
				{/* <View className='flex-1 px-[20px]    max-h-max pt-[20px] '>
					{isUserLoggingIn ? (
						<View className='items-center justify-center'>
							<Text className='text-sm text-black'>
								We&apos;r logging you in with google...{' '}
							</Text>
						</View>
					) : (
						<TouchableOpacity
							onPress={() => handleGoogleLogin()}
							className='h-[50px] bg-white rounded-[16px] justify-center items-center '
							style={styles.shadow}
						>
							<View className='flex-row gap-[10px] items-center'>
								<GoogleIcon height={25} width={25} />
								<Text className='text-lg font-bold text-app4'>
									Continue with Google
								</Text>
							</View>
						</TouchableOpacity>
					)}
					<View className='flex-row justify-center gap-[5px] mt-[30px]'>
						<Text className='text-[16px] text-app4'>
							Already have an account!
						</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate('Signin')}
						>
							<Text className='text-[16px] text-app1 font-bold'>
								Sign In
							</Text>
						</TouchableOpacity>
					</View>
				</View> */}
			</ScrollView>
		</View>
	);
};

export default SignupScreen;

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
