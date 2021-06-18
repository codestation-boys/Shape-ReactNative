import React , { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { VictoryPie, VictoryArea } from "victory-native";

import { Header } from '../../components/Header';
import { MeasuresTDO } from '../../dtos/MeasuresDTO';
import { CalculateDTO } from '../../dtos/CalculatesDTO';

import {
	Container,
	Content,
	HeaderContent,
	TitleHistorico,
	ButtonAddMedidas,
	ResumeData,
	FeatMass,
	LessMass,
	ContentCharts,
	TitleChart
} from './styles';
import api from '../../services/api';
interface indesCalcProps{
	lastIndex: number;
	hasReg: boolean;
}
interface totalBodyPros
{
	key: string;
	name: string;
	color: string;
	total: string;
	totalFormatted: string;
	percent:number;
	percentFormatted: string;
}
export function Dashboard(){

	const [measures, setMeasures] = useState<MeasuresTDO>({} as MeasuresTDO);
	const [calculate, setCalculate] = useState<CalculateDTO>({} as CalculateDTO);
	const [indexes, setIndexes] = useState<indesCalcProps>({} as indesCalcProps);
	const { sigOut, user , refreshToken} = useAuth();
	const theme = useTheme();
	const navigation = useNavigation();
	const [totalBody, setTotalBody] = useState<totalBodyPros[]>([]);

	async function getInfoUser() {

		try {
			const response = await api.get('/statistics/measures');
			if(response.data){
				setMeasures(response.data);
			}

			const response_calc = await api.get('/statistics/calculations');
			if(response_calc.data){
				setCalculate(response_calc.data);
			}
		} catch (error) {
			if(error?.response?.data?.message){
				if(error.response.data.message === "jwt expired"){
					refreshToken();
				}
			}
		}
	}
	function handleGoInsertMeasures() {
		navigation.navigate('InfoUser');
	}
	useEffect(() => {
		getInfoUser();
	},[user])
	useEffect(() => {
		if(calculate?.historicCalculations?.length > 0){
			let lastIndex = calculate.historicCalculations.length - 1;
			let hasReg = true;
			setIndexes({lastIndex, hasReg});
		}
	}, [calculate]);
	useEffect(() => {
		if(indexes.lastIndex){
			let lastData = calculate.historicCalculations[indexes.lastIndex];
			// console.log(lastData);
			setTotalBody([
				{
					key: '1',
					color: 'yellow',
					name: 'Gordura Corporal',
					percent: lastData.body_fat_percentage,
					percentFormatted: `${lastData.body_fat_percentage}%`,
					totalFormatted: `${lastData.body_fat_percentage}`,
					total:`${lastData.body_fat_percentage}`

				},
				{
					key: '2',
					color: 'blue',
					name: 'Massa Corporal',
					percent: lastData.body_mass_index,
					percentFormatted: `${lastData.body_mass_index}%`,
					totalFormatted: `${lastData.body_mass_index}`,
					total:`${lastData.body_mass_index}`

				},
				{
					key: '3',
					color: 'green',
					name: 'body_mass',
					percent: lastData.lean_mass,
					percentFormatted: `${lastData.lean_mass}%`,
					totalFormatted: `${lastData.lean_mass}`,
					total:`${lastData.lean_mass}`

				}
			]);
		}

	}, [indexes]);
	return (

		<Container>
			<Header
			internal
			color={theme.colors.dark}
			/>
			<Content>
				<HeaderContent>

					<TitleHistorico>
						Histórico Corporal
					</TitleHistorico>
					<ButtonAddMedidas
						onPress={handleGoInsertMeasures}
					>
						<MaterialCommunityIcons
							name="plus"
							size={RFValue(30)}
							color={theme.colors.text_light}
						/>
					</ButtonAddMedidas>
				</HeaderContent>
					{indexes.hasReg === true &&
						<ResumeData>
							<FeatMass>
								{`Massa gorda \n ${
									calculate
									.historicCalculations[indexes.lastIndex]
									.fat_mass
									}${
										calculate
										.unitsMeasure
										.fat_mass
									}`}
							</FeatMass>
							<LessMass>
								{`Massa magra \n ${
									calculate
									.historicCalculations[indexes.lastIndex]
									.lean_mass}${calculate.unitsMeasure.lean_mass}`}
							</LessMass>
						</ResumeData>
					}
					<ContentCharts>
						{totalBody.length > 0 &&
						<>
							<TitleChart >
								Indices corporais
							</TitleChart>
							<VictoryPie
								data={totalBody}
								x="percentFormatted"
								y="total"
								colorScale={totalBody.map(category => category.color)}
								style={{
									labels: {
										fontSize: RFValue(18),
										fontWeight: 'bold',
										fill: theme.colors.text
									},
								}}
								labelRadius={70}

							/>
						</>
						}
					</ContentCharts>
			</Content>
		</Container>
	)

}
