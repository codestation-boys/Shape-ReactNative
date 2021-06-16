import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { InfoUser } from '../screens/InfoUser';



const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
	return (
		<Navigator headerMode="none">
			<Screen
				name="InfoUser"
				component={InfoUser}
			/>
		</Navigator>
	)
}
