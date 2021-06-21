import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
	height: 100%;
	background-color: ${({ theme }) => theme.colors.background};

`;

export const TitleContent = styled.Text`
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.title};
	font-family: ${({ theme }) => theme.fonts.medium};
	margin-bottom: 15px;
`;
export const Content = styled.View`
	justify-content: space-between;
	margin: 24px;
	padding: 24px 0px;

`;
export const Form = styled.View`

`;


export const HeaderContent = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const TitleHistorico = styled.Text`
	font-size: ${RFValue(22)}px;
	color: ${({ theme }) => theme.colors.text_light};
	font-family: ${({ theme }) => theme.fonts.medium};
	margin-bottom: 24px;
`;

export const BoxContent = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.detail};
	margin-bottom: 24px;
	padding: 16px 18px;
	border-radius: 12px;
`;

export const BoxKM = styled.Text`
	font-size: ${RFValue(17)}px;
	color: ${({ theme }) => theme.colors.text_light};
	font-family: ${({ theme }) => theme.fonts.medium};
	width: 25%;
`;

export const BoxUser = styled.View`
	width: 75%;
	border-left-width: 1px;
	border-left-color: ${({ theme }) => theme.colors.text_light};
	padding-left: 16px;
`;

export const UserName = styled.Text`
	font-size: ${RFValue(17)}px;
	color: ${({ theme }) => theme.colors.text_light};
	font-family: ${({ theme }) => theme.fonts.medium};
	border-bottom-width: 1px;
	border-bottom-color: ${({ theme }) => theme.colors.text_light};
	text-align: left;
`;

export const BoxObjective = styled.View`
	margin-top: 5px;
	flex-direction: row;
	justify-content: space-around;
	text-align: center;
	align-items: center;

`;
export const Separator = styled.View`
	width: 7px;
	height: 7px;
	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.text_light};

`;
export const Objetctive = styled.Text`
	font-size: ${RFValue(12)}px;
	color: ${({ theme }) => theme.colors.text_light};
	font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Activity = styled.Text`
	font-size: ${RFValue(12)}px;
	color: ${({ theme }) => theme.colors.text_light};
	font-family: ${({ theme }) => theme.fonts.medium};
`;

