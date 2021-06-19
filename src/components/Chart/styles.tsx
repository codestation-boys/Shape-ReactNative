import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const TitleChart = styled.Text`
	margin-top: 24px;
	width: 100%;
	font-size: ${RFValue(18)}px;
	color: ${({ theme }) => theme.colors.text_light};
	font-family: ${({ theme }) => theme.fonts.bold};
	text-align: left;
	line-height: 21px;
`;
