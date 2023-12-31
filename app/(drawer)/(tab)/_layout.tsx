import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router/tabs';
import { StyleSheet, Text, View } from 'react-native';

export default function AppLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,

				tabBarStyle: {
					position: 'absolute',
					justifyContent: 'center',
					alignItems: 'center',
					paddingTop: 0,
					borderRadius: 15,
					height: 80,
					borderTopWidth: 0,
					...styles.shadow,
				},
				// @ts-ignore
				tabBarBackground: () => (
					<BlurView
						intensity={15}
						style={{
							...StyleSheet.absoluteFillObject,
							borderRadius: 15,
							overflow: 'hidden',
							height: 80,
							backgroundColor: 'rgba(0,0,0,0.5)',
						}}
					/>
				),
			}}
		>
			<Tabs.Screen
				// Name of the route to hide.
				name='home'
				options={{
					// eslint-disable-next-line react/no-unstable-nested-components
					tabBarIcon: ({ focused }) => (
						<View className='items-center justify-center gap-[2px]'>
							<Ionicons
								name={focused ? 'home' : 'home-outline'}
								size={22}
								color={focused ? '#E55E76' : '#FFF'}
							/>
							<Text
								className={`text-[10px]  ${
									focused ? 'text-app2' : 'text-[#FFF]'
								}`}
							>
								Home
							</Text>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				// Name of the route to hide.
				name='altitudeProfile'
				options={{
					// eslint-disable-next-line react/no-unstable-nested-components
					tabBarIcon: ({ focused }) => (
						<View className=' items-center justify-center gap-[0px]'>
							{focused ? (
								<Ionicons
									name='trending-up'
									size={22}
									color={focused ? '#E55E76' : '#fff'}
								/>
							) : (
								<View className='opacity-40'>
									<Ionicons
										name='trending-up-outline'
										color={focused ? '#E55E76' : '#fff'}
										size={22}
									/>
								</View>
							)}
							<Text
								className={`text-[10px]  ${
									focused ? 'text-app2' : 'text-[#FFF]'
								}`}
							>
								Altitude Profile
							</Text>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				// Name of the route to hide.
				name='ams'
				options={{
					// eslint-disable-next-line react/no-unstable-nested-components
					tabBarIcon: ({ focused }) => (
						<View className=' items-center justify-center gap-[0px]'>
							{focused ? (
								<Ionicons
									name='alert-circle'
									size={22}
									color={focused ? '#E55E76' : '#fff'}
								/>
							) : (
								<View className='opacity-40'>
									<Ionicons
										name='alert-circle-outline'
										size={22}
										color={focused ? '#E55E76' : '#fff'}
									/>
								</View>
							)}
							<Text
								className={`text-[10px]  ${
									focused ? 'text-app2' : 'text-[#FFF]'
								}`}
							>
								AMS
							</Text>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				// Name of the route to hide.
				name='profile'
				options={{
					headerShown: false,
					// eslint-disable-next-line react/no-unstable-nested-components
					tabBarIcon: ({ focused }) => (
						<View className=' items-center justify-center gap-[2px]'>
							{focused ? (
								<FontAwesome
									name='user'
									size={20}
									color={focused ? '#E55E76' : '#fff'}
								/>
							) : (
								<View className='opacity-40'>
									<FontAwesome
										name='user-o'
										size={20}
										color={focused ? '#E55E76' : '#fff'}
									/>
								</View>
							)}
							<Text
								className={`text-[10px]  ${
									focused ? 'text-app2' : 'text-[#FFF]'
								}`}
							>
								Profile
							</Text>
						</View>
					),
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	shadow: {
		shadowColor: '#1C1B1F',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
});
