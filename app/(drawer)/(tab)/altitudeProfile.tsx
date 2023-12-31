import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { ImageBackground } from 'expo-image';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const AltitudeProfileScreen = () => {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [elevationData, setElevationData] = useState([]);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	const getElevation = async () => {
		if (location !== null) {
			try {
				// const options = {
				// 	method: 'GET',
				// 	url: 'https://elevation-from-latitude-and-longitude.p.rapidapi.com/',
				// 	params: {
				// 		lat: location?.coords.latitude,
				// 		lng: location?.coords.longitude,
				// 	},
				// 	headers: {
				// 		'X-RapidAPI-Key':
				// 			'a5617a5b74mshc2a729cb995e591p1a0018jsnf300abcafd3a',
				// 		'X-RapidAPI-Host':
				// 			'elevation-from-latitude-and-longitude.p.rapidapi.com',
				// 	},
				// };

				// const response = await axios.request(options);
				const response = await axios.get(
					`https://api.open-meteo.com/v1/elevation?latitude=${location?.coords.latitude}&longitude=${location?.coords.longitude}`
				);
				setElevationData(response.data);
				console.log(response);
			} catch (error) {
				console.log('Error in getElevation!:: ', error);
			}
		}
	};

	useEffect(() => {
		getElevation();
	}, [location]);

	let text = 'Waiting..';
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}
	return (
		<View className='flex-1'>
			<ImageBackground
				source={require('../../../assets/images/homebg.png')}
				className='pt-10 px-5 h-[300px]'
			>
				<View className='flex-row gap-4 items-center'>
					<TouchableOpacity
						onPress={() => router.back()}
						className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center'
					>
						<AntDesign name='back' size={20} color='black' />
					</TouchableOpacity>
					<Text className='text-2xl font-bold'>Altitude Profile</Text>
				</View>
				<View className='flex-1 items-center justify-center gap-3'>
					<TextInput
						id='loc'
						placeholder='Search location for altitude profile...'
						className='bg-white h-[50px] rounded-[14px] w-[80%] px-4 text-lg'
					/>
					<TouchableOpacity className='bg-[#2C7475] h-[50px] w-[80%] drop-shadow-2xl rounded-[14px] flex justify-center items-center '>
						<Text className='text-lg text-white font-bold'>
							Get Data
						</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
			<View className=' p-5 bg-[#C2DFED] flex-1'>
				<View className='flex-row gap-1 items-center'>
					<Text className='text-lg font-bold'>
						Current Location Elevation :
					</Text>
					<Text className='text-lg '>
						{/* @ts-ignore */}
						{elevationData.elevation} Meters
					</Text>
				</View>
			</View>
		</View>
	);
};

export default AltitudeProfileScreen;
