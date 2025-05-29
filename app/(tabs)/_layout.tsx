import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { ImageBackground } from 'expo-image';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

const TabIcon = ({ focused, icon, title }: any) => {
	if (focused) {
		return (
			<ImageBackground
				source={images.highlight}
				resizeMode='stretch'
				// contentFit='stretch'
				className='justify-center items-center overflow-hidden rounded-full'
			>
				<View className='flex flex-1 flex-row justify-center items-center min-h-16 w-full min-w-[112px]'>
					<Image source={icon} tintColor='#151312' className='size-5' />
					<Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
				</View>
			</ImageBackground>
		);
	}

	return (
		<View className='size-full items-center justify-center rounded-full'>
			<Image source={icon} tintColor='#A8B5DB' className='size-5' />
		</View>
	);
};

const _layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: '#0f0D23',
					borderRadius: 50,
					marginHorizontal: 20,
					marginBottom: 36,
					paddingTop: 5,
					height: 52,
					position: 'absolute',
					borderWidth: 1,
					borderColor: '#0f0D23',
					overflow: 'hidden',
				},
				tabBarItemStyle: {
					width: '100%',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center',
				},
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<>
							<TabIcon focused={focused} icon={icons.home} title='Home' />
						</>
					),
				}}
			/>

			<Tabs.Screen
				name='search'
				options={{
					title: 'Search',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<>
							<TabIcon focused={focused} icon={icons.search} title='Search' />
						</>
					),
				}}
			/>

			<Tabs.Screen
				name='saved'
				options={{
					title: 'Saved',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<>
							<TabIcon focused={focused} icon={icons.save} title='Saved' />
						</>
					),
				}}
			/>

			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<>
							<TabIcon focused={focused} icon={icons.person} title='Profile' />
						</>
					),
				}}
			/>
		</Tabs>
	);
};

export default _layout;
