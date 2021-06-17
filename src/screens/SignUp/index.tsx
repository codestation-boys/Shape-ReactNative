import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import {
	KeyboardAvoidingView,
	TouchableWithoutFeedback ,
	Keyboard,
	Platform
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



export function SignUp(){
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ sendRequest, setSendRequest ] = useState(false);
	const [ password, setPassword ] = useState('');
	const [ passwordC, setPasswordC ] = useState('');
	const [ birthDate, setBirthDate] = useState('');
	const [ genero, setGenero ] = useState<'feminino' | 'masculino'>('masculino');

	const navigation = useNavigation();
	const { signInWithGoogle, signInWithApple } = useAuth();

	function handleAlterGenero(genero: 'feminino' | 'masculino'){
		setGenero(genero);
	}

	const theme = useTheme();
	async function handleSignin(){
		setSendRequest(true);

		setSendRequest(false);
	}
	function handleSignUp(){

	}
	function handleSignIn(){
		navigation.goBack();
	}
	return (
		<KeyboardAvoidingView behavior="position" enabled={Platform.OS==='ios' ? true : false}  >
			{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
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
									onPress={() => handleAlterGenero('masculino')}
									color={theme.colors.button_background}
									enabled={genero === 'masculino'}
								/>
								<ButtonType
									title="Feminino"
									onPress={() => handleAlterGenero('feminino')}
									color={theme.colors.button_background}
									enabled={genero === 'feminino'}
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
								onPress={handleSignin}
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
								/> */}
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

						</WrapperFooter>
					</Content>
				</Container>
			{/* </TouchableWithoutFeedback> */}
		</KeyboardAvoidingView>

	)

}
