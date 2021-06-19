import React from 'react';
import { useTheme } from 'styled-components';
import {
	VictoryTheme,
	VictoryArea,
	VictoryChart,
	VictoryGroup
 } from "victory-native";
import {
	TitleChart,
} from './styles';


interface GraficosProps {
	date: string;
	value: string;
}
interface CharProps {
	dataPrimary: GraficosProps[];
	dataSecondary: GraficosProps[];
	titleChart: string;
}
export function ChartGroup({
	dataPrimary,
	dataSecondary,
	titleChart
}: CharProps){
	const theme = useTheme();
	return (
		<>
		<TitleChart >
			{titleChart}
		</TitleChart>
		<VictoryChart width={420} theme={VictoryTheme.material}>
		<VictoryGroup
		style={{
			data: { strokeWidth: 3, fillOpacity: 0.4 }
		}}
		>
		<VictoryArea
			data={dataPrimary}
			x="date"
			y="value"
			sortKey="date"
			style={{
				data: { fill: theme.colors.chart_primary, stroke: theme.colors.chart_primary }
			}}
		/>

		<VictoryArea
			data={dataSecondary}
			x="date"
			y="value"
			sortKey="date"
			style={{
				data: { fill: theme.colors.secondary, stroke: theme.colors.secondary }
			}}
		/>
		</VictoryGroup>
		</VictoryChart>
		</>

	)

}
