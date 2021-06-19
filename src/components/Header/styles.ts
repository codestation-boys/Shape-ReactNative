import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { BorderlessButton } from 'react-native-gesture-handler';

interface ContainerProps {
	color? :string;
	internal?:boolean;
}

export const Container = styled.View<ContainerProps>`
	padding-top: ${getStatusBarHeight() + 40}px;

	width: 100%;
	flex-direction: row;
	text-align: center;
	justify-content: center;
	background-color: ${({ color }) =>  color ? color : 'transparent'};
	${({internal}) => internal && css`
		box-shadow: 2px 1px black;
		padding-top: ${getStatusBarHeight() + 20}px;
	`}
`;
export const Empty = styled.View`
	width: 60px;
`;

export const SingOut = styled(BorderlessButton)`
	width: 60px;
`;

export const ContainerInternal = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
