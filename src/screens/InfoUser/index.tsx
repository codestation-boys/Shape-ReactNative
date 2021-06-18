import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

import {
	KeyboardAvoidingView,
	TouchableWithoutFeedback ,
	Keyboard,
	Platform
} from 'react-native';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

import {
	Container,
	Content,
	Form,
	TitleContent,

} from './styles';
import api from '../../services/api';
import { Alert } from 'react-native';



export function InfoUser(){

	const [ weight, setWeight ] = useState(0);
	const [ sendRequest, setSendRequest ] = useState(false);
	const [ waist, setWaist ] = useState(5);
	const [ neck, setNeck ] = useState(0);
	const [ height, setHeight ] = useState(0);

	const theme = useTheme();
	const navigation = useNavigation();
	const { user } = useAuth();
	function handleGoToDashboard() {
		navigation.navigate('Dashboard');
	}
	async function handleSubmit(){

		try {
			setSendRequest(true);
			let data = {
				height,
				weight,
				waist,
				neck
			};
			await api.post('/statistics/measures', data).then((response) => {
				if(response.status === 201){
					handleGoToDashboard();
				}
				setSendRequest(false);
			}).catch((error) => {
				console.log(error);
				Alert.alert('Ops', 'Houve algum erro ao salvar os dados, tente novamente mais tarde.');
				setSendRequest(false);
			});

		} catch (error) {
			setSendRequest(false);
		}
	}

	return (
		<KeyboardAvoidingView behavior="padding" enabled={Platform.OS ==='ios' ? true : false} >
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header
						internal
						color={theme.colors.dark}
					 />
					<Content>
						<TitleContent>
							Digite suas emdidas
						</TitleContent>
						<Form>
							<Input
								iconName="code"
								placeholder="Altura"
								keyboardType="numeric"
								onChangeText={(value) => setHeight(Number(value))}
								value={String(height)}
							/>
							<Input
								iconName="more-horizontal"
								placeholder="Peso"
								keyboardType="numeric"
								onChangeText={(value) => setWeight(Number(value))}
								value={String(weight)}
							/>

							<Input
								iconName="code"
								placeholder="Cintura"
								keyboardType="numeric"
								onChangeText={(value) => setWaist(Number(value))}
								value={String(waist)}
							/>

							<Input
								iconName="code"
								placeholder="Pescoço"
								keyboardType="numeric"
								onChangeText={(value) => setNeck(Number(value))}
								value={String(neck)}
							/>

							<Button
								title="Salvar"
								onPress={handleSubmit}
								enabled={!sendRequest}
								loading={sendRequest}
							/>

						</Form>
					</Content>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>

	)

}
