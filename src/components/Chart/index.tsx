import React from 'react';
import { useTheme } from 'styled-components';
import {
	VictoryTheme,
	VictoryArea,
	VictoryChart
 } from "victory-native";
import {
	TitleChart,
} from './styles';


interface GraficosProps {
	date: string;
	value: string;
}
interface CharProps {
	data: GraficosProps[];
	titleChart: string;
}
export function Chart({
	data,
	titleChart
}: CharProps){
	const theme = useTheme();
	return (
		<>
			<TitleChart >
				{titleChart}
			</TitleChart>
			<VictoryChart width={420} theme={VictoryTheme.material} >
				<VictoryArea
					data={data}
					x="date"
					y="value"
					interpolation="linear"
					sortKey="date"
					style={{
						data: {
							fill: theme.colors.chart_primary,
							stroke: theme.colors.chart_primary,
							strokeWidth: 3,
							fillOpacity: 0.8
						}
					}}
				/>
			</VictoryChart>
		</>

	)

}
