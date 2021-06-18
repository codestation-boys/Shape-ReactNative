import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
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

`;
export const Form = styled.View`

`;

export const WrapperFooter = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;


export const HeaderContent = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const TitleHistorico = styled.Text`
	font-size: ${RFValue(24)}px;
	color: ${({ theme }) => theme.colors.text_light};
	font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ButtonAddMedidas = styled(RectButton)`
	width: 50px;
	height: 50px;
	border-radius: 25px;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.detail};
`;


export const ResumeData = styled.View`
	flex-direction: row;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.colors.detail};
	padding:24px;
	border-radius: 12px;
	border:2px;
	border-color: ${({ theme }) => theme.colors.line};
	margin-top: 22px;
`;

export const FeatMass = styled.Text`
	font-size: ${RFValue(18)}px;
	color: ${({ theme }) => theme.colors.text_light};
	font-family: ${({ theme }) => theme.fonts.bold};
	text-align: center;
	line-height: 21px;

`;

export const LessMass = styled.Text`
	font-size: ${RFValue(18)}px;
	color: ${({ theme }) => theme.colors.text_light};
	font-family: ${({ theme }) => theme.fonts.bold};
	text-align: center;
	line-height: 21px;
	border-left-width: 2px;
	border-color: ${({ theme }) => theme.colors.text_light};
	padding-left: 15px;
`;


export const ContentCharts = styled.View`

	width: 100%;
	justify-content: center;
	align-items: center;
`;
export const TitleChart = styled.Text`
	margin-top: 24px;
	width: 100%;
	font-size: ${RFValue(18)}px;
	color: ${({ theme }) => theme.colors.text_light};
	font-family: ${({ theme }) => theme.fonts.bold};
	text-align: left;
	line-height: 21px;
`;
