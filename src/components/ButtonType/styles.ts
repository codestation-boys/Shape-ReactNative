import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps {
	color?: string;
	actived?: boolean;
}

interface TitleProps {
	light?: boolean;
}
export const Container = styled(RectButton)<ButtonProps>`
	width: 48%;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: ${({ color, theme }) => color ? color : theme.colors.main};
	border-width:1px;
	border-color: ${({ theme, actived }) =>actived === true ? theme.colors.main : theme.colors.border_button};
	margin-bottom: 8px;
	border-radius: 5px;
	padding: ${RFValue(16)}px;

`;

export const Title = styled.Text<TitleProps>`
	font-family: ${({ theme }) => theme.fonts.bold};
	font-size:${RFValue(15)}px ;
	color: ${({ light, theme }) => light ? theme.colors.title : theme.colors.text_light};

`;
