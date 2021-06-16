import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
	height: 100%;
	background-color: ${({ theme }) => theme.colors.background};
	justify-content: space-between;
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
	padding: 24px 24px;
	background-color: ${({ theme }) => theme.colors.shape};

`;
export const Form = styled.View`

`;

export const Footer = styled.View`
	padding: 24px 24px;
	background-color: ${({ theme }) => theme.colors.background};

`;

export const TitleFooter = styled.Text`
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.shape};
	font-family: ${({ theme }) => theme.fonts.medium};
`;

export const WrapperFooter = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;