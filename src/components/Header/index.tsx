import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
	Container,
	ContainerInternal,
	Empty,
	SingOut,
} from './styles';
import Logo from '../../assets/gym.svg';
import LogoHeader from '../../assets/logo_header.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

interface Props {
	internal?: boolean;
	color?: string;
}

export function Header({
	internal=false,
	color
}: Props){
	const theme = useTheme();
	const { sigOut } = useAuth();
	return (
		<Container
			color={color}
			internal={internal}
		>
			{internal === true ?
				<ContainerInternal>
					<Empty />
					<LogoHeader width={RFValue(60)} height={RFValue(60)} />
					<SingOut onPress={sigOut}>
						<MaterialCommunityIcons
							name="power-standby"
							size={RFValue(25)}  color={theme.colors.text_light}
						/>
					</SingOut>
				</ContainerInternal>
				:
				<Logo width={RFValue(128)} height={RFValue(100)} />
			}
		</Container>

	)

}
