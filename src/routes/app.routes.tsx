import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { InfoUser } from '../screens/InfoUser';
import { Dashboard } from '../screens/Dashboard';



const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
	return (
		<Navigator headerMode="none">
			<Screen
				name="Dashboard"
				component={Dashboard}
			/>
			<Screen
				name="InfoUser"
				component={InfoUser}
			/>
		</Navigator>
	)
}
