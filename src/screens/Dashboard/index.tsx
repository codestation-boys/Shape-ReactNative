import React , { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import { format } from 'date-fns';

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
	Empty,
	TitleEmpty
} from './styles';
import api from '../../services/api';
import { Chart } from '../../components/Chart';
import { ChartGroup } from '../../components/ChartGroup';
interface indesCalcProps{
	lastIndex: number;
	hasReg: boolean;
}
interface GraficosProps {
	date: string;
	value: string;
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
	const [dataIMC, setDataIMC] = useState<GraficosProps[]>([]);
	const [dataBF, setDataBF] = useState<GraficosProps[]>([]);
	const [dataWT, setDataWT] = useState<GraficosProps[]>([]);

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
	function handleGoFind(){
		navigation.navigate('Parceiros');
	}
	useEffect(() => {
		getInfoUser();
	},[user])
	useEffect(() => {
		if(calculate?.historicCalculations?.length > 0){
			let lastIndex = calculate.historicCalculations.length - 1;
			let hasReg = true;
			setIndexes({lastIndex, hasReg});
			let tempIMC = [] as GraficosProps[];
			let tempBF = [] as GraficosProps[];
			calculate.historicCalculations.map((data) => {

				tempIMC.push({
					date: format(new Date(data.created_at), 'MM'),
					value: `${data.body_mass_index}`
				});
				tempBF.push({
					date: format(new Date(data.created_at), 'MM'),
					value: `${data.fat_mass}`
				});
			});

			setDataIMC(tempIMC);
			setDataBF(tempBF);
		}
	}, [calculate]);
	useEffect(() => {
		if(measures?.historicMeasures?.length > 0){
			let tempWT = [] as GraficosProps[];
			measures.historicMeasures.map((data) => {
				tempWT.push({
					date: format(new Date(data.created_at), 'MM'),
					value: `${data.weight}`
				});

			});
			setDataWT(tempWT);
		}
	},[measures]);
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
					{indexes.hasReg === true ?
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
					:
						<ResumeData>
							<Empty
								onPress={handleGoInsertMeasures}
							>
								<TitleEmpty>
									{`Informe suas medidas aqui`}
								</TitleEmpty>
							</Empty>
						</ResumeData>
					}
					<ContentCharts>
						{dataWT.length > 0 &&
							<Chart
								titleChart="Histórico Peso"
								data={dataWT}
							/>
						}
						{dataBF.length > 0 && dataIMC.length > 0 ?
							<ChartGroup
								titleChart="Histórico IMC X BF"
								dataPrimary={dataIMC}
								dataSecondary={dataBF}
							/>
						:
						<ResumeData>
							<Empty
								onPress={handleGoFind}
							>
								<TitleEmpty>
									{`Encontrar companheiros de treino`}
								</TitleEmpty>
							</Empty>
						</ResumeData>
						}
					</ContentCharts>

			</Content>
		</Container>
	)

}
