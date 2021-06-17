import React , { useState } from 'react';
import { useTheme } from 'styled-components';
import Chart from "react-apexcharts";


import { Header } from '../../components/Header';

import {
	Container,
	Content,
	Footer,
	WrapperFooter,

} from './styles';


export function Dashboard(){
	const user = {
		gender: 'male'
	};
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
	const theme = useTheme();

	return (

		<Container>
			<Header
			internal
			color={theme.colors.dark}
			/>
			<Content>
				<Chart
				options={data.options}
				series={data.series}
				type="bar"
				width="500"
				/>
			</Content>
			<Footer>
				<WrapperFooter>

				</WrapperFooter>
			</Footer>
		</Container>
	)

}
