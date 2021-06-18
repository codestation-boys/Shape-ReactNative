import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
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
import { SigninSocialButton } from '../../components/SigninSocialButton';

import {
	Container,
	Content,
	Form,
	TitleContent,
	Footer,
	WrapperFooter,
	WrapperButtons,
	BackgroundImage
} from './styles';

import AppleSvg from '../../assets/apple_icon.svg';
import GitHubSvg from '../../assets/github.svg';
import GoogleSvg from '../../assets/google_icon.svg';
import Background from '../../assets/bg-login.png';
import api from '../../services/api';



export function SignUp(){
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ sendRequest, setSendRequest ] = useState(false);
	const [ password, setPassword ] = useState('');
	const [ passwordC, setPasswordC ] = useState('');
	const [ birthDate, setBirthDate] = useState('2021-06-15T16:51:15.837Z');
	const [ gender, setGender ] = useState<'female' | 'male'>('male');

	const navigation = useNavigation();
	const { signInWithGoogle, signInWithApple } = useAuth();

	function handleAlterGenero(genero: 'female' | 'male'){
		setGender(genero);
	}

	const theme = useTheme();

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
					"Ocorreu um erro ao fazer login, verifique as credenciais"
				);
			}
			setSendRequest(false);
		}

	}
	function handleSignIn(){
		navigation.goBack();
	}
	return (
		<KeyboardAvoidingView behavior="position" enabled={Platform.OS==='ios' ? true : false}  >
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
							<Input
								iconName="calendar"
								placeholder="Data de nascimento"
								keyboardType="numeric"
								autoCorrect={false}
								onChangeText={setBirthDate}
								value={birthDate}
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
						<WrapperFooter>
								{/* <Button
									title=""
									color={theme.colors.text_light}
									onPress={handleSignIn}
									enabled={true}
									loading={false}
									iconName="chevron-double-left"
									light
								/>
								<SigninSocialButton
									title="Login Google"
									svg={GoogleSvg}
									onPress={signInWithGoogle}
								/>

								<SigninSocialButton
									title="Login Apple"
									svg={GitHubSvg}
									onPress={(signInWithApple)}
								/>
								*/}
						</WrapperFooter>
					</Content>
				</Container>
		</KeyboardAvoidingView>

	)

}
