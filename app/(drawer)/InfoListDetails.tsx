import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
	Dimensions,
	Image,
	StatusBar,
	StyleSheet,
	// Text,
	View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SharedElement } from 'react-native-shared-element';

type ScreenProps = {
	navigation: NavigationProp<any, 'InfoListDetails'>; // Replace 'RootStackParamList' with your actual stack param list type
	route: RouteProp<any>;
};

const { width, height } = Dimensions.get('window');

const DURATION = 500;

const animation = {
	0: {
		opacity: 0,
		translateY: 100,
	},
	1: {
		opacity: 1,
		translateY: 0,
	},
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InfoListDetails: React.FC<ScreenProps> = ({ navigation, route }) => {
	// @ts-ignore
	// const { item } = route.params;
	const { item } = useLocalSearchParams();
	console.log(item);
	// const item = JSON.parse(param);
	return (
		<View className='relative flex-1 bg-app10 pt-[40px]'>
			<StatusBar translucent backgroundColor={'transparent'} />
			{/* @ts-ignore */}
			<SharedElement
				id={`item.${item.key}.bg`}
				style={[StyleSheet.absoluteFillObject]}
			>
				<View
					// eslint-disable-next-line react-native/no-inline-styles
					style={{
						position: 'absolute',
						width: width,
						height: height + 40,
						backgroundColor: item.color,
					}}
				/>
			</SharedElement>

			{/* @ts-ignore */}
			<SharedElement
				id={`item.${item.key}.image`}
				style={[{ paddingHorizontal: 10 }]}
			>
				<Image
					source={{ uri: item.img }}
					// eslint-disable-next-line react-native/no-inline-styles
					style={{ width: 100, height: 100 }}
					className='rounded-[12px]'
				/>
			</SharedElement>

			{/* @ts-ignore */}
			<SharedElement id={`item.${item.key}.meta`}>
				<View className=' px-[10px]'>
					<Animatable.Text
						useNativeDriver
						animation={animation}
						duration={DURATION + 100}
						className='text-xl font-black text-app4'
					>
						{item.type}
					</Animatable.Text>
				</View>
				<View className='px-[10px]'>
					<Animatable.Text
						useNativeDriver
						animation={animation}
						duration={DURATION + 200}
						className='text-black'
					>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Quaerat quo enim facere officia doloribus? Laborum
						autem possimus, quo, explicabo, quas corporis totam
						molestiae corrupti asperiores obcaecati minus optio?
						Vel, in. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Sint nulla blanditiis voluptates ea
						nam. Laboriosam dolorum corrupti ullam quo animi atque
						voluptatibus recusandae ipsam perspiciatis aliquam unde,
						veritatis quidem. Commodi? Lorem ipsum dolor sit amet,
						consectetur adipisicing elit. Alias a ipsa in incidunt
						dolorem. Ut voluptate sint nisi repellendus numquam
						eligendi, ullam aspernatur autem libero maiores, dicta
						hic minima reiciendis!
					</Animatable.Text>
				</View>
			</SharedElement>
		</View>
	);
};

InfoListDetails.sharedElement = (route, otherRoute, showing) => {
	// const { item } = route.params;
	const { item } = useLocalSearchParams();

	return [
		{
			id: `item.${item.key}.bg`,
		},
		{
			id: `item.${item.key}.meta`,
		},
		{
			id: `item.${item.key}.image`,
		},
	];
};

export default InfoListDetails;
