import React from 'react';

import {
	Container,
	Title
} from './styles';
import Logo from '../../assets/gym.svg';
import LogoHeader from '../../assets/logo_header.svg';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
	internal?: boolean;
	color?: string;
}

export function Header({
	internal=false,
	color
}: Props){

	return (
		<Container
			color={color}
			internal={internal}
		>
			{internal === true ?
				<LogoHeader width={RFValue(60)} height={RFValue(60)} />
				:
				<Logo width={RFValue(128)} height={RFValue(100)} />
			}
		</Container>

	)

}
