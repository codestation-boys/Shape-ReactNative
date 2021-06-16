import React from 'react';

import {
	Container,
	Title
} from './styles';
import Logo from '../../assets/gym.svg';
import { RFValue } from 'react-native-responsive-fontsize';

export function Header(){

	return (
		<Container>
			<Logo width={RFValue(50)} height={RFValue(50)} />
		</Container>

	)

}
