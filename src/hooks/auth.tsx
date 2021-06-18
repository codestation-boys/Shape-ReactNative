import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';

import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDTO } from '../dtos/UserDTO';
import api from '../services/api';
import base64 from 'react-native-base64'
import { Alert } from 'react-native';

export const AuthContext = createContext({} as IAuthContextData);

interface AuthProviderProps {
	children : ReactNode;
}

interface SignInCredentials {
	email: string;
	password: string;
}

interface IAuthContextData {
	user: UserDTO;
	signInWithGoogle(): Promise<void>;
	signInWithApple(): Promise<void>;
	sigOut(): Promise<void>;
	signIn: (credentials: SignInCredentials) => Promise<void>;
	userStorageLoading: boolean;
}

function AuthProvider({ children, ...rest } : AuthProviderProps) {

	const [user, setUser] = useState<UserDTO>({} as UserDTO);
	const [ userStorageLoading, setUserStorageLoading ] = useState(true);
	const dataKey = '@gofinacen:user';

	async function signIn({ email, password }: SignInCredentials){

		try {
			let acess_token = base64.encode(`${email}:${password}`);
			api.defaults.headers.authorization = `Basic ${acess_token}`;

			api.post('/accounts/login').then(async (response) => {
				const {access_token, refresh_token,  user_data} = response.data;
				const newUser = { ...user_data, access_token, refresh_token } as UserDTO;
				api.defaults.headers.authorization = `Bearer ${access_token}`;
				setUser(newUser);
				await AsyncStorage.setItem(dataKey, JSON.stringify(newUser));
			}).catch((error) => {
				Alert.alert(
					"Erro na autenticação",
					"Ocorreu um erro ao fazer login, verifique as credenciais"
				);
			});

		} catch (error) {

			throw new Error(error);
		}

	}
	async function refreshToken(){

		try {
			api.defaults.headers.authorization = ``;
			const response = await api.post('/accounts/refresh-token', {
				refresh_token: user.refresh_token
			});

			const {access_token, refresh_token,  user_data} = response.data;
			const newUser = { ...user_data, access_token, refresh_token } as UserDTO;
			api.defaults.headers.authorization = `Bearer ${access_token}`;
			setUser(newUser);
			await AsyncStorage.setItem(dataKey, JSON.stringify(newUser));
		} catch (error) {
			throw new Error(error);
		}

	}
	async function signInWithGoogle(){
		try {
			const result = await Google.logInAsync({
				iosClientId: '597824373648-lqm77jcafg4vf34ogss524cvaludabg3.apps.googleusercontent.com',
				androidClientId: '597824373648-npsn59eu4cv33ciqdaqcai1gl601icj9.apps.googleusercontent.com',
				scopes: [
					'profile',
					'email'
				]
			});
			if(result.type === 'success'){
				const userLogged = {
					id: String(result.user.id),
					email: result.user.email!,
					name: formatName(result.user.name!),
					gender: '',
					date_birth: ''
				};
				setUser(userLogged);
				await AsyncStorage.setItem(dataKey, JSON.stringify(userLogged));
			}
		} catch (error) {
			throw new Error(error);
		}
	}
	async function signInWithApple(){
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				]
			});
			if(credential){
				const name = formatName(credential.fullName!.givenName!);
				const userLogged = {
					id: String(credential.user),
					email: credential.email!,
					name,
					gender: '',
					date_birth: ''
				};
				setUser(userLogged);
				await AsyncStorage.setItem(dataKey, JSON.stringify(userLogged));
			}
		} catch (error) {
			throw new Error(error);
		}
	}
	function formatName(name: string){
		const splitName = name.split(" ");
		if(splitName.length > 2){
			return `${splitName[0]} ${splitName[1]}`;
		}else{
			return name;
		}
	}
	async function sigOut(){
		setUser({} as UserDTO);
		await AsyncStorage.removeItem(dataKey);
	}
	useEffect(() => {
		async function getUserAsync() {
			const userStoraged =  await AsyncStorage.getItem(dataKey);
			if(userStoraged){
				const userLogged = JSON.parse(userStoraged) as UserDTO;
				setUser(userLogged);
				if(userLogged.access_token && userLogged.access_token !== ''){
					api.defaults.headers.authorization = `Bearer ${userLogged.access_token}`;
				}
			}
			setUserStorageLoading(false);
		}
		getUserAsync();

	},[]);
	return(
		<AuthContext.Provider value={{
			user,
			signInWithGoogle,
			signInWithApple,
			sigOut,
			signIn,
			userStorageLoading
			}} >
			{ children }
		</AuthContext.Provider>
	)
}


function useAuth() {
	const context = useContext(AuthContext);

	return context;
}

export { AuthProvider , useAuth}
