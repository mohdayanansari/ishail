import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	useWindowDimensions,
} from 'react-native';
import Animated, {
	Extrapolate,
	SharedValue,
	interpolate,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { OnboardingData } from '../constants/onBoardingData';

const OnboardingItem = ({
	item,
	index,
	x,
}: {
	item: OnboardingData;
	index: number;
	x: SharedValue<number>;
}) => {
	// const animation = useRef(null);
	const { width: SCREEN_WIDTH } = useWindowDimensions();

	const lottieAnimatedStyle = useAnimatedStyle(() => {
		const translateYAnimation = interpolate(
			x.value,
			[
				(index - 1) * SCREEN_WIDTH,
				index * SCREEN_WIDTH,
				(index + 1) * SCREEN_WIDTH,
			],
			[200, 0, -200],
			Extrapolate.CLAMP
		);
		return {
			transform: [{ translateY: translateYAnimation }],
		};
	});

	const circleAnimation = useAnimatedStyle(() => {
		const scale = interpolate(
			x.value,
			[
				(index - 1) * SCREEN_WIDTH,
				index * SCREEN_WIDTH,
				(index + 1) * SCREEN_WIDTH,
			],
			[1, 4, 4],
			Extrapolate.CLAMP
		);

		return {
			transform: [{ scale: scale }],
		};
	});
	return (
		<View
			className={`flex-1 justify-around items-center mb-[120px] `}
			style={{ width: SCREEN_WIDTH }}
		>
			<View style={styles.circleContainer}>
				<Animated.View
					className=''
					style={[
						{
							width: SCREEN_WIDTH,
							height: SCREEN_WIDTH,
							backgroundColor: item.backgroundColor,
							borderRadius: SCREEN_WIDTH / 2,
						},
						circleAnimation,
					]}
				/>
			</View>
			<Animated.View style={lottieAnimatedStyle}>
				<LottieView
					autoPlay
					// ref={animation}
					style={{
						width: SCREEN_WIDTH * 0.9,
						height: SCREEN_WIDTH * 0.9,
					}}
					loop
					source={item.animation}
				/>
			</Animated.View>
			<Text
				className={`font-bold text-[32px] text-center mx-5 `}
				style={{ color: item.textColor }}
			>
				{item.text}
			</Text>
			<View>
				<Text className='text-lg font-bold text-black text-center px-5 mb-[10px] '>
					{item.desc}
				</Text>
			</View>
			<View className='absolute bottom-[-80px]  right-4'>
				{item.id === 3 && (
					<TouchableOpacity
						onPress={() => router.replace('/login')}
						className='bg-black  p-5 w-[140px] rounded-full'
					>
						<Text className='text-white text-xl uppercase text-center font-bold'>
							Get Started
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default OnboardingItem;

const styles = StyleSheet.create({
	circleContainer: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
});
