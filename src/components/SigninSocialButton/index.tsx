import React from 'react';

import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import {
	Button,
	ImageContainer,
	Title,
 } from './styles';


interface Props extends RectButtonProps {
	title: string;
	svg : React.FC<SvgProps>;
	onlysvg?: boolean;
}

export function SigninSocialButton({
	title,
	svg: Svg,
	onlysvg = false,
	...rest
}: Props) {
	return(
		<Button
			{...rest}
		>
			<ImageContainer>
				<Svg />
			</ImageContainer>
			{onlysvg &&
			<Title>
				{ title }
			</Title>
			}
		</Button>
	)
}
