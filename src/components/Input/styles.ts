import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';


interface ContainerProps {
	isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
	flex-direction: row;
	border-radius: 4px;
	${({isFocused, theme}) => isFocused && css`
		border-width: 2px;
		border-color: ${({theme}) => theme.colors.main};
	`}

	margin-bottom: 12px;
`;

export const IconContainer = styled.View`
	width: ${RFValue(56)}px;
	height: ${RFValue(56)}px;
	justify-content: center;
	align-items: center;

	background-color: ${({ theme }) => theme.colors.detail};

`;
export const InputText = styled(TextInput)`
	flex:1;
	background-color: ${({ theme }) => theme.colors.detail};
	color: ${({ theme }) => theme.colors.text_light};
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(15)}px;
	padding :0 23px;
`;
