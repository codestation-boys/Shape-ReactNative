import React , { useState } from 'react';
import { Platform, Alert } from 'react-native';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isAfter } from 'date-fns';

import { useTheme } from 'styled-components';

import {
	Container,
	IconContainer,
	OpenDataTimeAndroid,
	TextButton,
} from './styles';
import { useEffect } from 'react';

interface Props extends TextInputProps{
	iconName: React.ComponentProps<typeof Feather>['name'];
	setValue: (date: Date | undefined) => void;
}

export function InputDate({
	iconName,
	setValue
}: Props){
	const [ selectedDateTime, setSelectedDateTime ] = useState(new Date());
	const [ showDatePicker, setShowDatePicker] = useState( Platform.OS == 'ios' );

	const theme = useTheme()

	function handleOpenDateTimePickerAndroid(){
		setShowDatePicker(oldState => !oldState);
	}
	function handleChangeTime(event: Event, dateTime: Date | undefined) {
		if(Platform.OS == 'android'){
			setShowDatePicker(oldState => !oldState);
		}

		if(dateTime && isAfter(dateTime, new Date())){
			setSelectedDateTime(new Date());
			return Alert.alert('Ops', 'Revise sua data de nascimento!');
		}

		if(dateTime){
			setSelectedDateTime(dateTime);
		}
	}
	useEffect(() => {
		setValue(selectedDateTime);
	}, [selectedDateTime]);
	return (
		<Container >
			{Platform.OS === 'ios' ?
			(
				<TextButton>
					Data de nascimento
				</TextButton>
			)
			:
				<IconContainer>
					<Feather
						name={iconName}
						size={24}
						color={theme.colors.title}
						/>
				</IconContainer>
			}
			{showDatePicker && (
				<DateTimePicker
				value={selectedDateTime}
				mode="date"
				display="spinner"
				onChange={handleChangeTime}
				style={{
					flex:1,
					backgroundColor: theme.colors.detail,
					justifyContent: 'center',
				}}
				/>
			)}

			{
			Platform.OS === 'android' && (
				<OpenDataTimeAndroid
				onPress={handleOpenDateTimePickerAndroid}
				>
				<TextButton>
				{`${format(selectedDateTime, 'dd/MM/yyyy')}`}
				</TextButton>
				</OpenDataTimeAndroid>
				)
			}
		</Container>

	)

}
