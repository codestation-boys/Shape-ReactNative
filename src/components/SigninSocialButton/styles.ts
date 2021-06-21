import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Button = styled(RectButton)`
	height: ${RFValue(48)}px;
	background-color: ${({ theme }) => theme.colors.text_light};
	border-radius: 5px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	width: 96px;

`;
export const ImageContainer = styled.View`
	height: 100%;
	justify-content: center;
	align-items: center;

	padding: ${RFValue(16)}px;

`;
export const Title = styled.Text`
	flex: 1;
	text-align: left;
	font-family: ${({ theme }) => theme.fonts.bold};
	font-size: ${RFValue(14)}px;

`;
