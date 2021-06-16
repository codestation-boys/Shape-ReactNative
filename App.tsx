import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';
import {
	useFonts,
	Roboto_300Light,
	Roboto_400Regular,
	Roboto_500Medium,
	Roboto_700Bold
} from '@expo-google-fonts/roboto';


import theme from './src/styles/theme';

export default function App() {
	const [ fontsLoaded ] = useFonts({
		Roboto_300Light,
		Roboto_400Regular,
		Roboto_500Medium,
		Roboto_700Bold
	});

	if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
		<ThemeProvider theme={theme}>
			<StatusBar
				barStyle="light-content"
				translucent
				backgroundColor="transparent"
			/>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</ThemeProvider>
  );
}
