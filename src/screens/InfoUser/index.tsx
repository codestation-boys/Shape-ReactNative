import React, { useState } from 'react';
import { Alert } from 'react-native';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

import {
	KeyboardAvoidingView,
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

import { MeasuresTDO } from '../../dtos/MeasuresDTO';
import { useEffect } from 'react';

interface UserMeasures {
	height: number;
	weight: number;
	waist: number;
	neck: number;
	hip?: number;
}

export function InfoUser(){

	const [ sendRequest, setSendRequest ] = useState(false);
	const [measures, setMeasures] = useState<MeasuresTDO>({} as MeasuresTDO);
	const [ userMeasures , setUserMeasures ] = useState<UserMeasures>({} as UserMeasures);
	const theme = useTheme();
	const navigation = useNavigation();
	const { user , refreshToken} = useAuth();
	function handleGoToDashboard() {
		navigation.navigate('Dashboard');
	}
	async function handleSubmit(){

		try {
			setSendRequest(true);
			await api.post('/statistics/measures', {
				height: Number(userMeasures.height),
				hip: 	Number(userMeasures.hip),
				neck: 	Number(userMeasures.neck),
				waist: 	Number(userMeasures.waist),
				weight: Number(userMeasures.weight),
			}).then((response) => {
				setSendRequest(false);
				handleGoToDashboard();
			}).catch((error) => {
				if(error?.response?.data?.message){
					Alert.alert('Ops', error.response.data.message);
				}else{
					Alert.alert('Ops', 'Houve algum erro ao salvar os dados, tente novamente mais tarde.');
				}
				setSendRequest(false);

			});

		} catch (error) {
			setSendRequest(false);
		}
	}
	async function getInfoUser() {

		try {
			const response = await api.get('/statistics/measures');
			if(response.data){
				setMeasures(response.data);
			}
		} catch (error) {
			if(error?.response?.data?.message){
				if(error.response.data.message === "jwt expired"){
					refreshToken();
				}
			}
		}
	}
	function handleSetMeasures(measures: UserMeasures) {
		setUserMeasures(measures);
	}
	useEffect(() => {
		getInfoUser();
	}, [user]);
	useEffect(()=> {
		if(measures?.historicMeasures?.length > 0){
			let index = measures.historicMeasures.length - 1;
			let tempMeasures = measures.historicMeasures[index];
			setUserMeasures({
				height:	tempMeasures.height ,
				hip:	tempMeasures.hip,
				neck:	tempMeasures.neck,
				waist:	tempMeasures.waist,
				weight:	tempMeasures.weight
			});
		}
	},[measures]);

	return (
		<KeyboardAvoidingView behavior="padding" enabled={Platform.OS ==='ios' ? true : false} >
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
								onChangeText={(value) => handleSetMeasures({...userMeasures, height:Number(value)})}
								value={String(userMeasures.height)}
								defaultValue={String(userMeasures.height? userMeasures.height : '')}
							/>
							<Input
								iconName="more-horizontal"
								placeholder="Peso"
								keyboardType="numeric"
								onChangeText={(value) => handleSetMeasures({...userMeasures, weight:Number(value)})}
								value={String(userMeasures.weight)}
								defaultValue={String(userMeasures.weight? userMeasures.weight : '')}
							/>

							<Input
								iconName="code"
								placeholder="Cintura"
								keyboardType="numeric"
								onChangeText={(value) => handleSetMeasures({...userMeasures, waist:Number(value)})}
								value={String(userMeasures.waist)}
								defaultValue={String(userMeasures.waist? userMeasures.waist : '')}
							/>
							{user.gender === 'female' &&
								<Input
									iconName="code"
									placeholder="Quadril"
									keyboardType="numeric"
									onChangeText={(value) => handleSetMeasures({...userMeasures, hip:Number(value)})}
									value={String(userMeasures.hip)}
									defaultValue={String(userMeasures.hip? userMeasures.hip : '')}
							/>
							}
							<Input
								iconName="code"
								placeholder="Pescoço"
								keyboardType="numeric"
								onChangeText={(value) => handleSetMeasures({...userMeasures, neck:Number(value)})}
								value={String(userMeasures.neck)}
								defaultValue={String(userMeasures.neck? userMeasures.neck : '')}
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
		</KeyboardAvoidingView>

	)

}
