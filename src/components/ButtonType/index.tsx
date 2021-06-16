import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { RectButtonProps } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
	Container,
	Title
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props extends RectButtonProps{
	title: string;
	color?: string;
	loading?: boolean;
	light?: boolean;
	iconName?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}

export function ButtonType({
	title,
	color,
	onPress,
	enabled = true,
	loading = false,
	light= false,
	iconName,
	...rest
} : Props){
	const theme = useTheme();
	return (
		<Container
			{...rest}
			color={color ? color : theme.colors.main}
			onPress={onPress}
			style={{opacity: (enabled === false || loading === true) ? .5 : 1}}
		>
			{loading ?
				<ActivityIndicator color={theme.colors.shape} size="small" />
			:
				iconName
					? <>
						<MaterialCommunityIcons
							name={iconName}
							color={light ? theme.colors.text : theme.colors.main}
							size={RFValue(24)}
						/>
						<Title light={light}> { title } </Title>
					</>

					:	<Title light={light}> { title } </Title>
			}
		</Container>

	)

}
