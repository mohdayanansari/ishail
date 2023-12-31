import { router } from 'expo-router';
import React, { useState } from 'react';
import {
	Dimensions,
	FlatList,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SharedElement } from 'react-native-shared-element';
import data, { ORANGE, tabs } from '../../constants/homePageInfo';

const { width } = Dimensions.get('window');

const InfoList = () => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);
	return (
		<ScrollView>
			<View className='px-[20px]'>
				<FlatList
					data={tabs}
					keyExtractor={(item, index) => `${item}-${index}`}
					horizontal
					showsHorizontalScrollIndicator={false}
					style={[
						styles.shadow,
						// eslint-disable-next-line react-native/no-inline-styles
						{
							backgroundColor: '#e7e7f9',
							flexGrow: 0,
							marginBottom: 20,
							paddingHorizontal: 10,
							borderRadius: 12,
							width: '100%',
						},
					]}
					// eslint-disable-next-line react-native/no-inline-styles
					contentContainerStyle={{
						height: 50,
						alignItems: 'center',
						//   paddingBottom: 10,
					}}
					renderItem={({ item: tab }) => {
						return (
							<TouchableOpacity
								onPress={() => setSelectedTab(tab)}
							>
								<View
									style={[
										styles.pill,
										// eslint-disable-next-line react-native/no-inline-styles
										{
											backgroundColor:
												selectedTab === tab
													? ORANGE
													: 'transparent',
										},
									]}
								>
									<Text
										style={[
											styles.pillText,
											// eslint-disable-next-line react-native/no-inline-styles
											{
												color:
													selectedTab === tab
														? '#fff'
														: '#000',
											},
										]}
									>
										{tab}
									</Text>
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			</View>
			<View className='pl-[20px]'>
				<FlatList
					data={data}
					// @ts-ignore
					keyExtractor={(item) => item.key}
					horizontal
					showsHorizontalScrollIndicator={false}
					snapToInterval={width - 40}
					decelerationRate={'fast'}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() => {
									router.push({
										pathname: '/InfoListDetails',
										params: item,
									});
								}}
								className=' h-[125px] '
								style={{ width: width - 40 }}
							>
								<View className='flex-1 flex-row gap-[10px] p-[10px] '>
									{/* @ts-ignore */}
									<SharedElement
										id={`item.${item.key}.bg`}
										// eslint-disable-next-line react-native/no-inline-styles
										style={[
											StyleSheet.absoluteFillObject,
											{ width: '100%' },
										]}
									>
										<View
											className={'rounded-[16px]'}
											// eslint-disable-next-line react-native/no-inline-styles
											style={{
												position: 'absolute',
												width: '100%',
												height: '100%',
												backgroundColor: item.color,
											}}
										/>
									</SharedElement>
									{/* @ts-ignore */}
									<SharedElement
										id={`item.${item.key}.image`}
										// eslint-disable-next-line react-native/no-inline-styles
										style={{
											width: 100,
											height: 100,
											borderRadius: 12,
										}}
									>
										<Image
											source={{ uri: item.img }}
											// eslint-disable-next-line react-native/no-inline-styles
											style={{ width: 100, height: 100 }}
											className='rounded-[12px]'
										/>
									</SharedElement>
									{/* @ts-ignore */}
									<SharedElement
										id={`item.${item.key}.meta`}
										// eslint-disable-next-line react-native/no-inline-styles
										style={[{ flex: 1, paddingRight: 10 }]}
									>
										<View className='flex-1 pr-[10px]'>
											<Text className='text-lg leading-[20px] font-black text-app4'>
												{item.type}
											</Text>
											<Text className='text-xs font-base text-app4/70'>
												{item.abt}
											</Text>
										</View>
									</SharedElement>
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	pill: {
		paddingHorizontal: 10,
		paddingVertical: 10 / 2,
		borderRadius: 12,
	},
	pillText: {
		fontWeight: '700',
	},
	mainImage: {
		width: 54,
		height: 54,
		resizeMode: 'contain',
		marginRight: 10,
	},
	titleName: {
		fontWeight: '800',
		fontSize: 16,
	},
	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.24,
		shadowRadius: 1.27,

		elevation: 1,
	},
});

export default InfoList;
