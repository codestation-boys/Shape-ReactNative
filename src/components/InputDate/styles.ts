import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Platform } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

export const Container = styled.View`
	${Platform.OS === 'ios' ? css `
		flex-direction: column;
	`
	: css `
		flex-direction: row;
	`}
	border-radius: 4px;
	margin-bottom: 12px;
`;

export const IconContainer = styled.View`
	width: ${RFValue(56)}px;
	height: ${RFValue(56)}px;
	justify-content: center;
	align-items: center;

	background-color: ${({ theme }) => theme.colors.detail};


`;
export const OpenDataTimeAndroid = styled.TouchableOpacity`
	flex:1;
	background-color: ${({ theme }) => theme.colors.detail};
	justify-content: center;
`;
export const TextButton = styled.Text`
	color: ${({ theme }) => theme.colors.title};
	background-color: ${({ theme }) => theme.colors.detail};
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(15)}px;
	padding :0 23px;
`;
