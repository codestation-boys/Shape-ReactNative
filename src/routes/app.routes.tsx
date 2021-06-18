import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { InfoUser } from '../screens/InfoUser';
import { Dashboard } from '../screens/Dashboard';
import { Find } from '../screens/Find';



const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
	const theme = useTheme();
	return (
		<Navigator
			tabBarOptions={{
				activeTintColor:theme.colors.light,
				inactiveTintColor: theme.colors.text_light,
				labelPosition: 'beside-icon',
				style: {
					paddingBottom: Platform.OS === 'ios' ? 20 : 0,
					height: 72,
					backgroundColor: theme.colors.success,
					borderTopColor: theme.colors.success
				},
				activeBackgroundColor: theme.colors.success_light,
				showLabel:false,
			}}
		>
			<Screen
				name="Dashboard"
				component={Dashboard}
				options={{
					tabBarIcon:(({ size, color }) => (
						<MaterialCommunityIcons
							name="view-dashboard-outline"
							size={size}
							color={color}
						/>
					))
				}}

			/>
			<Screen
				name="Parceiros"
				component={Find}
				options={{
					tabBarIcon:(({ size, color }) => (
						<MaterialCommunityIcons
							name="map-marker-distance"
							size={size}
							color={color}
						/>
					))
				}}
			/>
			<Screen
				name="InfoUser"
				component={InfoUser}
				options={{
					tabBarIcon:(({ size, color }) => (
						<MaterialCommunityIcons
							name="clipboard-plus-outline"
							size={size}
							color={color}
						/>
					))
				}}
			/>
		</Navigator>
	)
}
