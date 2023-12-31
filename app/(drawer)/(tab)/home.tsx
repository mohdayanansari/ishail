import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DrawerToggleButton, useDrawerStatus } from '@react-navigation/drawer';
import { NavigationProp } from '@react-navigation/native';
import { Image, ImageBackground } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InfoList from '../../../components/home-screen/InfoList';

type ScreenProps = {
	navigation: NavigationProp<any, 'Home'>; // Replace 'RootStackParamList' with your actual stack param list type
};

const HomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
	return (
		<SafeAreaView className='flex-1 pt-[40px] bg-[#C2DFED]'>
			<StatusBar
				backgroundColor='transparent'
				translucent={true}
				style='auto'
			/>

			<View className='flex-1  justify-between '>
				<View>
					{/* Navbar */}
					<View className=' h-[50px] flex-row items-center justify-between px-[20px] '>
						<View className='w-[40px] h-[40px] rounded-full items-center justify-center bg-app1'>
							<Image
								source={require('../../../assets/images/dp.jpeg')}
								className='w-[50px] h-[50px] rounded-full'
							/>
						</View>
						<DrawerToggleButton />
					</View>
					{/* Main Body Container */}
					<View className=''>
						{/* Greeting Container */}
						<View className='p-[20px] flex-row gap-[5px] '>
							<Text className='text-3xl text-app4'>
								Welcome back,
							</Text>
							<Text className='text-3xl font-bold text-app4'>
								Ayan!
							</Text>
						</View>
						{/* Todays topic container */}
						{/* <View></View> */}
						{/* -----------Info List carousel--------- */}
						<InfoList />
					</View>
				</View>
				<ImageBackground
					source={require('../../../assets/images/homebg.png')}
					className=' border-b border-[#84aea683] '
					// style={styles.shadow}
				>
					{/* ----- Complete your profile section ------  */}
					<ScrollView
						showsVerticalScrollIndicator={false}
						className='px-[20px] mt-[20px] pb-[100px]'
					>
						<View className='bg-[#FCDDEC] relative rounded-[16px] h-[150px] p-[20px]'>
							<View className='absolute right-[20px] top-[35px]'>
								{/* <CommunityPeople /> */}
							</View>
							<View className='w-[70%]'>
								<Text className='text-xl font-black text-app3'>
									Complete your profile!
								</Text>
								<Text className='text-base text-app3 my-[10px]'>
									Let&apos;s open up to the thing that matters
									among the people
								</Text>
							</View>
							<TouchableOpacity className=' flex-row items-center gap-[5px]'>
								<Text className='text-base text-app7'>
									Tap Here
								</Text>
								<Ionicons
									name='chevron-forward-circle'
									size={15}
									color={'#EF5DA8'}
								/>
							</TouchableOpacity>
						</View>
						<View className='bg-[#FFDDBE] relative rounded-[16px] h-[150px] p-[20px] mt-[20px] justify-between'>
							<View className='absolute right-[20px] top-[40px]'>
								{/* <AMSVector /> */}
							</View>
							<View className='w-[70%]'>
								<Text className='text-xl font-black text-app3'>
									Want to see your AMS Risk!
								</Text>
								{/* <Text className="text-base text-app3 my-[10px]">
                    Let’s open up to the thing that matters among the people
                  </Text> */}
							</View>
							<TouchableOpacity className=' flex-row items-center gap-[5px]'>
								<Text className='text-base text-app6'>
									Click Here
								</Text>
								<MaterialIcons
									name='accessibility'
									size={15}
									color={'#F09A59'}
								/>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</ImageBackground>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
