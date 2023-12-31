import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Image, ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth } from '../../firebaseConfig';

const CustomDrawerComponent = (props: any) => {
	const path = usePathname();
	return (
		<View className='flex-1'>
			<ImageBackground
				source={require('../../assets/images/moun.jpeg')}
				className=' border-b border-[#84aea683] '
				// style={styles.shadow}
			>
				<LinearGradient
					colors={['rgba(0,0,0,0.1)', '#000000b4']}
					className='pt-[10px] pb-[20px] items-center justify-end'
				>
					<View className='p-10 pb-5 pt-14 justify-center items-center'>
						<View
							className='flex justify-center items-center w-[100px] h-[100px] bg-[#84aea6] rounded-full shadow'
							style={styles.shadow}
						>
							<Image
								source={
									{ uri: auth.currentUser?.photoURL } ||
									require('../../assets/images/dp.jpeg')
								}
								className='w-[90px] h-[90px] rounded-full'
							/>
						</View>
					</View>
					<Text className='text-[14px] text-white text-center'>
						Hey 👋🏻,
					</Text>
					<Text className='text-[22px] text-white font-bold text-center uppercase'>
						{auth.currentUser?.displayName}
						Mohd Ayan Ansari
					</Text>
				</LinearGradient>
			</ImageBackground>
			<DrawerContentScrollView
				{...props}
				contentContainerStyle={{
					backgroundColor: '#c9ece5',
					paddingTop: 10,
				}}
			>
				{/* --------------------Link List-------------------  */}
				<View className='flex-1 '>
					<DrawerItem
						label={'Home'}
						labelStyle={styles.link}
						onPress={() => router.push('/(drawer)/(tab)/home')}
						icon={({ color, focused }) => (
							<Ionicons
								name={
									path === '/home' ? 'home' : 'home-outline'
								}
								size={22}
								color={color}
							/>
						)}
					/>
					<DrawerItem
						label={'Profile'}
						labelStyle={styles.link}
						onPress={() => router.push('/(drawer)/(tab)/profile')}
						icon={({ color, focused }) => (
							<FontAwesome
								name={path === '/profile' ? 'user' : 'user-o'}
								size={22}
								color={color}
							/>
						)}
					/>
					<DrawerItem
						label={'Travel Details'}
						labelStyle={styles.link}
						onPress={() => router.push('/(drawer)/travelDetails')}
						icon={({ color, focused }) => (
							<Ionicons
								name={
									path === '/travelDetails'
										? 'car-sport'
										: 'car-sport-outline'
								}
								size={22}
								color={color}
							/>
						)}
					/>
					<DrawerItem
						label={'Medical History'}
						labelStyle={styles.link}
						onPress={() => router.push('/(drawer)/medicalHistory')}
						icon={({ color, focused }) => (
							<Ionicons
								name={
									path === '/medicalHistory'
										? 'medical'
										: 'medical-outline'
								}
								size={22}
								color={color}
							/>
						)}
					/>
					<DrawerItem
						label={'AMS Risk Prediction'}
						labelStyle={styles.link}
						onPress={() => router.push('/(drawer)/(tab)/ams')}
						icon={({ color, focused }) => (
							<Ionicons
								name={
									path === '/ams'
										? 'alert-circle'
										: 'alert-circle-outline'
								}
								size={22}
								color={color}
							/>
						)}
					/>
					<DrawerItem
						label={'Physical Fitness'}
						labelStyle={styles.link}
						onPress={() => router.push('/(drawer)/physicalFitness')}
						icon={({ color, focused }) => (
							<Ionicons
								name={
									path === '/physicalFitness'
										? 'fitness'
										: 'fitness-outline'
								}
								size={22}
								color={color}
							/>
						)}
					/>
					<DrawerItem
						label={'Altitude Profile'}
						labelStyle={styles.link}
						onPress={() =>
							router.push('/(drawer)/(tab)/altitudeProfile')
						}
						icon={({ color, focused }) => (
							<Ionicons
								name={
									path === '/altitudeProfile'
										? 'trending-up'
										: 'trending-up-outline'
								}
								size={22}
								color={color}
							/>
						)}
					/>
					<DrawerItem
						label={'FAQ'}
						labelStyle={styles.link}
						onPress={() => router.push('/(drawer)/faq')}
						icon={({ color, focused }) => (
							<MaterialCommunityIcons
								name={
									path === '/faq'
										? 'head-question'
										: 'head-question-outline'
								}
								size={22}
								color={color}
							/>
						)}
					/>
					<DrawerItem
						label={'About Us'}
						labelStyle={styles.link}
						onPress={() => router.push('/(drawer)/aboutus')}
						icon={({ color, focused }) => (
							<Ionicons
								name={
									path === '/aboutus'
										? 'happy'
										: 'happy-outline'
								}
								size={22}
								color={color}
							/>
						)}
					/>
					<DrawerItem
						label={'Contact Us'}
						labelStyle={styles.link}
						onPress={() => router.push('/(drawer)/contact')}
						icon={({ color, focused }) => (
							<MaterialCommunityIcons
								name={
									path === '/contact'
										? 'contacts'
										: 'contacts-outline'
								}
								size={22}
								color={color}
							/>
						)}
					/>
				</View>
			</DrawerContentScrollView>

			<View
				className='bg-[#a5c9c2] h-[30%] shadow w-full pt-[5px] px-[20px] pb-[20px] border-t border-[#84aea63d]'
				style={styles.shadow}
			>
				<Image
					source={require('../../assets/images/lo.png')}
					className='w-[90px] h-[90px] ml-[-10px] rounded-full'
				/>
				<TouchableOpacity onPress={() => {}} className='py-[15px] '>
					<View>
						<Text className='text-[#517e76] text-2xl'>i-SHAIL</Text>
						<Text className='text-[#517e76] text-xs font-bold uppercase'>
							Self Management for High Altitude Illness
						</Text>
					</View>
				</TouchableOpacity>
				{/* <Text>Theme</Text> */}
				<TouchableOpacity
					onPress={async () => {
						await auth.signOut();
						// router.replace('/login');
					}}
					className='py-[15px]'
				>
					<View className='flex-row items-center '>
						<Ionicons
							name='exit-outline'
							size={22}
							color={'#517e76'}
						/>
						<Text className='ml-[15px] text-[15px] text-[#517e76]'>
							Logout
						</Text>
					</View>
				</TouchableOpacity>
				<Text className='text-[#517e76] py-[15px]'>Version 0.0.1</Text>
			</View>
		</View>
	);
};

export default function Layout() {
	return (
		<Drawer
			drawerContent={(props: any) => <CustomDrawerComponent {...props} />}
			screenOptions={{ headerShown: false }}
		>
			<Drawer.Screen
				name='faq'
				options={{ headerShown: true, title: 'FAQ' }}
			/>
			<Drawer.Screen
				name='aboutus'
				options={{ headerShown: true, title: 'About Us' }}
			/>
			<Drawer.Screen
				name='contact'
				options={{ headerShown: true, title: 'Contact Us' }}
			/>
		</Drawer>
	);
}

const styles = StyleSheet.create({
	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.8,
		shadowRadius: 16.0,
		elevation: 24,
		zIndex: 1,
	},
	link: {
		marginLeft: -20,
		fontSize: 16,
	},
});
