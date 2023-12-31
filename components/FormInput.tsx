import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { TextInput, View } from 'react-native';

const FormInput = ({
	labelValue,
	iconType,
	placeholder,
	...rest
}: {
	labelValue: string;
	iconType: string;
	placeholder: string;
}) => {
	return (
		<View className='flex-row bg-white w-full items-center border border-black/10  rounded-2xl mb-5'>
			<View className='border-r border-black/20 flex flex-row items-center justify-center w-[50px] h-full'>
				<AntDesign name={iconType} size={25} color='#666' />
			</View>
			<TextInput
				value={labelValue}
				numberOfLines={1}
				placeholder={placeholder}
				placeholderTextColor='#666'
				className='flex-1 text-black pl-2'
				{...rest}
			/>
		</View>
	);
};

export default FormInput;
