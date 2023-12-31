import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, ViewToken } from 'react-native';
import Animated, {
	useAnimatedRef,
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
import OnboardingItem from '../components/OnboardingItem';
import { DataOB } from '../constants/onBoardingData';

const HomeScreen = () => {
	const flatListRef = useAnimatedRef();
	const x = useSharedValue(0);
	const flatListIndex = useSharedValue(0);

	const onViewableItemsChanged = ({
		viewableItem,
	}: {
		viewableItem: ViewToken[];
	}) => {
		if (viewableItem[0].index !== null) {
			flatListIndex.value = viewableItem[0].index;
		}
	};

	const onScroll = useAnimatedScrollHandler({
		onScroll: (event) => {
			x.value = event.contentOffset.x;
		},
	});
	return (
		<View style={styles.container}>
			{/* @ts-ignore */}
			<Animated.FlatList
				ref={flatListRef}
				onScroll={onScroll}
				data={DataOB}
				renderItem={({ item, index }) => {
					return <OnboardingItem item={item} index={index} x={x} />;
				}}
				keyExtractor={(item) => item.id}
				scrollEventThrottle={16}
				horizontal={true}
				bounces={false}
				pagingEnabled={true}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
