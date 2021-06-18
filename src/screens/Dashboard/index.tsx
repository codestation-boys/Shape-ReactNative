import React , { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import Chart from "react-apexcharts";


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

} from './styles';
import api from '../../services/api';
interface indesCalcProps{
	lastIndex: number;
	hasReg: boolean;
}

export function Dashboard(){
	const [data, setData] = useState({
		options: {
		  chart: {
			id: 'apexchart-example'
		  },
		  xaxis: {
			categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
		  }
		},
		series: [{
		  name: 'series-1',
		  data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
		}]
	});
	const [measures, setMeasures] = useState<MeasuresTDO>({} as MeasuresTDO);
	const [calculate, setCalculate] = useState<CalculateDTO>({} as CalculateDTO);
	const [indexes, setIndexes] = useState<indesCalcProps>({} as indesCalcProps);
	const { sigOut, user } = useAuth();
	const theme = useTheme();
	const navigation = useNavigation();
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
			console.log(error);
		}
	}
	function handleGoInsertMeasures() {
		navigation.navigate('InfoUser');
	}
	useEffect(() => {
		getInfoUser();
	},[])
	useEffect(() => {
		if(calculate?.historicCalculations?.length > 0){
			let lastIndex = calculate.historicCalculations.length - 1;
			let hasReg = true;
			setIndexes({lastIndex, hasReg});
		}
	}, [calculate]);
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
										.body_fat_percentage
									}`}
							</FeatMass>
							<LessMass>
								{`Massa magra \n ${calculate.historicCalculations[0].lean_mass}${calculate.unitsMeasure.body_fat_percentage}`}
							</LessMass>
						</ResumeData>
					}
			</Content>
		</Container>
	)

}
