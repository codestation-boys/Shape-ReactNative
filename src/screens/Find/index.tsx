import React , { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

import { Header } from '../../components/Header';
import { UserDTO } from '../../dtos/UserDTO';
import {
	Container,
	Content,
	HeaderContent,
	TitleHistorico,
	BoxContent,
	BoxKM,
	BoxUser,
	UserName,
	BoxObjective,
	Objetctive,
	Activity,
	Separator
} from './styles';

import api from '../../services/api';


interface indesCalcProps{
	lastIndex: number;
	hasReg: boolean;
}
interface UserMatch {
	user: UserDTO;
	data: {
		distancia: string;
		atividade: string;
		objetivo: string;
	}
}
export function Find(){

	const { user } = useAuth();
	// const [users, setUsers] = useState<UserMatch[]>([] as UserMatch[]);
	const theme = useTheme();
	const navigation = useNavigation();
	const users = [
		{
			user: {
				name:'Arthur',
				email: 'Arthur@gmail.com',
				gender: 'male',
				id: '0001'
			},
			data: {
				distancia: '1.2',
				atividade: 'Caminhada',
				objetivo: 'Sair do sedentarismo'
			}
		},
		{
			user: {
				name:'Jhohnatan Gutemberg',
				email: 'Arthur@gmail.com',
				gender: 'male',
				id: '0002'
			},
			data: {
				distancia: '1.4',
				atividade: 'Academia',
				objetivo: 'Perder peso'
			}
		},
		{
			user: {
				name:'Cesar Augusto',
				email: 'csr2314@gmail.com',
				gender: 'male',
				id: '0003'
			},
			data: {
				distancia: '1.5',
				atividade: 'Ciclismo',
				objetivo: 'Perder peso'
			}
		},

	];
	useEffect(() => {
		// setUsers()
	},[])

	return (

		<Container>
			<Header
			internal
			color={theme.colors.dark}
			/>
			<Content>
				<HeaderContent>
					<TitleHistorico>
						Encontrar Parceiros de treino
					</TitleHistorico>
				</HeaderContent>
				<FlatList
					data={users}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.user.id}
					renderItem={({item}) => (
						<BoxContent>
							<BoxKM>
								{`${item.data.distancia} KM`}
							</BoxKM>
							<BoxUser>
								<UserName>
									{item.user.name}
								</UserName>
								<BoxObjective>
									<Objetctive>
										{item.data.objetivo}
									</Objetctive>
									<Separator/>
									<Activity>
										{item.data.atividade}
									</Activity>
								</BoxObjective>
							</BoxUser>
						</BoxContent>
					)}
				/>
			</Content>
		</Container>
	)

}
