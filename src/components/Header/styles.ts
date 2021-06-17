import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps {
	color? :string;
	internal?:boolean;
}

export const Container = styled.View<ContainerProps>`
	padding-top: ${getStatusBarHeight() + 40}px;

	width: 100%;
	flex-direction: row;
	text-align: center;
	justify-content: center;
	background-color: ${({ color }) =>  color ? color : 'transparent'};
	${({internal}) => internal && css`
		box-shadow: 2px 1px black;
		padding-top: ${getStatusBarHeight() + 20}px;
	`}
`;
export const Title = styled.Text`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.main};
	font-family: ${({ theme }) => theme.fonts.bold};
`;
