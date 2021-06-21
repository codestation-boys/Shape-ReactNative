import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';

import {
	KeyboardAvoidingView,
	Platform,
	Alert
} from 'react-native';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { ButtonType } from '../../components/ButtonType';
import { Button } from '../../components/Button';

import {
	Container,
	Content,
	Form,
	TitleContent,
	WrapperButtons,
	BackgroundImage
} from './styles';


import Background from '../../assets/bg-login.png';
import api from '../../services/api';
import { InputDate } from '../../components/InputDate';



export function SignUp(){
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ sendRequest, setSendRequest ] = useState(false);
	const [ password, setPassword ] = useState('');
	const [ passwordC, setPasswordC ] = useState('');
	const [ birthDate, setBirthDate] = useState<Date | undefined>(new Date());
	const [ gender, setGender ] = useState<'female' | 'male'>('male');

	const navigation = useNavigation();
	const theme = useTheme();
	function handleAlterGenero(genero: 'female' | 'male'){
		setGender(genero);
	}

	async function handleSignUp(){
		setSendRequest(true);
		if(password !== passwordC){
			return Alert.alert('Ops', 'As senhas precisam ser idênticas');
		}
		try {
			const schema = Yup.object().shape({
				email: Yup.string()
					.required('E-mail obrigatório!')
					.email('Digite um e-mail válido!'),
				password: Yup.string()
					.required('A senha é obrigatória!')

			});
			await schema.validate({ email, password});
			let data = {
				name,
				email,
				password,
				gender,
				date_birth: birthDate
			}
			await api.post('/accounts',data)
			.then(() => {
				setSendRequest(false);
				Alert.alert(
					"Conta Criada !",
					"Faça login para iniciar!",
					[
						{
							text: "Entendi !",
							onPress: handleSignIn,
							style: "default"
						}
					]
					);
			})
			.catch((response) => {
				Alert.alert('Opa', 'Não foi possivel cadastrar');
				setSendRequest(false);
			});
		} catch (error) {
			if(error instanceof Yup.ValidationError){
				setSendRequest(false);
				Alert.alert("Ops", error.message);
			}else{
				Alert.alert(
					"Erro na autenticação",
					"Ocorreu algum erro, verifique seus dados e tente novamente."
				);
			}
			setSendRequest(false);
		}

	}
	function handleSignIn(){
		navigation.goBack();
	}
	function handleChangeTime(date: Date | undefined) {
		if(date){
			setBirthDate(date);
		}
	}
	return (
		<KeyboardAvoidingView behavior="padding" enabled={Platform.OS==='ios' ? true : false}  >
				<Container>
					<BackgroundImage source={Background} resizeMode="cover"/>
					<Content>
						<TitleContent>
							Faça seu cadastro para começar!
						</TitleContent>
						<Form>
							<Input
								iconName="user"
								placeholder="Nome"
								keyboardType="default"
								autoCorrect={false}
								autoCapitalize="words"
								onChangeText={setName}
								value={name}
							/>
							<Input
								iconName="mail"
								placeholder="E-mail"
								keyboardType="email-address"
								autoCorrect={false}
								autoCapitalize="none"
								onChangeText={setEmail}
								value={email}
							/>
							<InputDate
								iconName="calendar"
								setValue={handleChangeTime}
							/>

							<WrapperButtons>
								<ButtonType
									title="Masculino"
									onPress={() => handleAlterGenero('male')}
									color={theme.colors.button_background}
									enabled={gender === 'male'}
								/>
								<ButtonType
									title="Feminino"
									onPress={() => handleAlterGenero('female')}
									color={theme.colors.button_background}
									enabled={gender === 'female'}
								/>
							</WrapperButtons>
							<PasswordInput
								iconName="lock"
								placeholder="Senha"
								onChangeText={setPassword}
								value={password}
							/>
							<PasswordInput
								iconName="lock"
								placeholder="Confirmar senha"
								onChangeText={setPasswordC}
								value={passwordC}
							/>
							<Button
								title="Fazer cadastro"
								onPress={handleSignUp}
								enabled={!sendRequest}
								loading={sendRequest}
							/>
						</Form>
					</Content>
				</Container>
		</KeyboardAvoidingView>

	)

}
