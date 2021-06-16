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
import { Button } from '../../components/Button';
import { SigninSocialButton } from '../../components/SigninSocialButton';
import { Header } from '../../components/Header';

import {
	Container,
	Content,
	Form,
	TitleContent,
	Footer,
	WrapperFooter
} from './styles';

import AppleSvg from '../../assets/apple_icon.svg';
import GoogleSvg from '../../assets/google_icon.svg';


export function SignIn(){
	const [ email, setEmail ] = useState('');
	const [ sendRequest, setSendRequest ] = useState(false);
	const [ password, setPassword ] = useState('');

	const { signInWithGoogle, signInWithApple } = useAuth();
	const navigation = useNavigation();
	const theme = useTheme();
	async function handleSignin(){
		setSendRequest(true);

		setSendRequest(false);
	}
	function handleSignUp(){
		navigation.navigate('SignUp');
	}
	return (
		<KeyboardAvoidingView behavior="padding" enabled >
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header />
					<Content>
						<TitleContent>
							Fazer Login
						</TitleContent>
						<Form>
							<Input
								iconName="mail"
								placeholder="E-mail"
								keyboardType="email-address"
								autoCorrect={false}
								autoCapitalize="none"
								onChangeText={setEmail}
								value={email}
							/>
							<PasswordInput
								iconName="lock"
								placeholder="Senha"
								onChangeText={setPassword}
								value={password}
							/>
							<Button
								title="Login"
								onPress={handleSignin}
								enabled={!sendRequest}
								loading={sendRequest}
							/>
							<WrapperFooter>
								<Button
									title=""
									color={theme.colors.shape}
									onPress={handleSignUp}
									enabled={true}
									loading={false}
									iconName="plus-box"
								/>
								<SigninSocialButton
									title="Google"
									svg={GoogleSvg}
									onPress={signInWithGoogle}
								/>
								{Platform.OS === 'ios' &&
									<SigninSocialButton
										title="Apple"
										svg={AppleSvg}
										onPress={signInWithApple}
									/>
								}
							</WrapperFooter>
						</Form>
					</Content>
					<Footer>

					</Footer>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>

	)

}
