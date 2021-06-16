import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
	padding-top: ${getStatusBarHeight() + 15}px;
	width: 100%;
	height: 120px;
	flex-direction: row;
	text-align: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.background};
`;
export const Title = styled.Text`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.main};
	font-family: ${({ theme }) => theme.fonts.bold};
`;
