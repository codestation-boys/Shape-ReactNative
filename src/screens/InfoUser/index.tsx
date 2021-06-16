import React, { useState } from 'react';
import { useTheme } from 'styled-components';

import {
	KeyboardAvoidingView,
	TouchableWithoutFeedback ,
	Keyboard
} from 'react-native';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ButtonType } from '../../components/ButtonType';
import { Header } from '../../components/Header';

import {
	Container,
	Content,
	Form,
	TitleContent,
	Footer,
	WrapperFooter,

} from './styles';
import { useRef } from 'react';

export function InfoUser(){
	const user = {
		gender: 'male'
	};
	const [ weight, setWeight ] = useState('');
	const [ sendRequest, setSendRequest ] = useState(false);
	const [ waist, setWaist ] = useState('');
	const [ neck, setNeck ] = useState('');
	const [ height, setHeight ] = useState('');
	const theme = useTheme();
	async function handleSignin(){
		setSendRequest(true);

		setSendRequest(false);
	}
	function handleSignUp(){

	}

	return (
		<KeyboardAvoidingView behavior="padding" enabled >
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header />
					<Content>
						<TitleContent>
							Agora é só informar os dados complementares para iniciar.
						</TitleContent>
						<Form>
							<Input
								iconName="code"
								placeholder="Altura"
								keyboardType="numeric"
								onChangeText={setHeight}
								value={height}
							/>
							<Input
								iconName="more-horizontal"
								placeholder="Peso"
								keyboardType="numeric"
								onChangeText={setWeight}
								value={weight}
							/>
							{user.gender !== 'male' ?
								<Input
									iconName="code"
									placeholder="Cintura"
									keyboardType="numeric"
									onChangeText={setWaist}
									value={waist}
								/>
							:null}
							<Input
								iconName="code"
								placeholder="Pescoço"
								keyboardType="numeric"
								onChangeText={setNeck}
								value={neck}
							/>

							<Button
								title="Salvar"
								onPress={handleSignin}
								enabled={!sendRequest}
								loading={sendRequest}
							/>

						</Form>
					</Content>
					<Footer>
						<WrapperFooter>

							</WrapperFooter>
					</Footer>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>

	)

}
