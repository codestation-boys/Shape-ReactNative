import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {Keyboard} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
	background-color: ${({ theme }) => theme.colors.background};
	justify-content: space-between;
	height: 100%;
`;

export const TitleContent = styled.Text`
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.text_light};
	font-family: ${({ theme }) => theme.fonts.medium};
	margin-bottom: 15px;
`;
export const Content = styled.View`
	justify-content: space-between;
	margin: 24px;
	padding: 24px 24px 36px 24px;
	background-color: ${({ theme }) => theme.colors.shape};
	border-radius: 12px;

`;
export const Form = styled.View`

`;

export const Footer = styled.View`


`;

export const ButtonCadastrar = styled(BorderlessButton)`
	position: absolute;
	bottom: ${RFValue(-30)}px;
	left: ${RFValue(20)}px;
`;
export const TitleFooter = styled.Text`
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.text_light};
	font-family: ${({ theme }) => theme.fonts.medium};
	text-align: center;
	width: 100%;
`;

export const WrapperFooter = styled.View`
	margin-top: 31px;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;



export const BackgroundImage = styled.ImageBackground`
	position: absolute;
	width: 100%;
	height: 100%;
`;
