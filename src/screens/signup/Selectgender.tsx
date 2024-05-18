import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shallowEqual } from 'react-redux';
// Correct the typo in the import statement for StackNavigationProp
import { StackNavigationProp } from '@react-navigation/stack';

import { commonStyles } from '@/component/styles';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTempGender } from '@/store/slices';
import { Gender } from '@/store/types';
import ASSETS from '../../../assets';

// Define your RootStackParamList type if you haven't already
type RootStackParamList = {
	Setpassword: undefined; // Replace with your screen names and types
};

interface SelectgenderProps {
	navigation: StackNavigationProp<RootStackParamList, 'Setpassword'>;
}

const Selectgender: React.FC<SelectgenderProps> = ({ navigation }) => {
	const dispatch = useAppDispatch();

	const gender = useAppSelector((state) => state?.tempUser?.gender, shallowEqual);

	console.log({ gender });

	const handleGenderSelect = (_gender: Gender) => {
		console.log({ _gender });

		dispatch(setTempGender(_gender));
	};

	const handleSubmit = () => {
		navigation.navigate('Setpassword');
	};

	return (
		<SafeAreaView style={commonStyles.container}>
			<Text style={commonStyles.description}>I am a</Text>

			{/* Gender Buttons */}
			<TouchableOpacity
				style={[
					commonStyles.genderButton,
					gender === Gender.Male && commonStyles.selectedGender,
				]}
				onPress={() => handleGenderSelect(Gender.Male)}
			>
				<Image source={ASSETS.male} style={commonStyles.genderImage} />
				<Text
					style={
						commonStyles[gender === Gender.Male ? 'selectedGendertext' : 'gendertext']
					}
				>
					Male
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[
					commonStyles.genderButton,
					gender === Gender.Female && commonStyles.selectedGender,
				]}
				onPress={() => handleGenderSelect(Gender.Female)}
			>
				<Image source={ASSETS.female} style={commonStyles.genderImage} />
				<Text
					style={
						commonStyles[gender === Gender.Female ? 'selectedGendertext' : 'gendertext']
					}
				>
					Female
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[
					commonStyles.genderButton,
					gender === Gender.Other && commonStyles.selectedGender,
				]}
				onPress={() => handleGenderSelect(Gender.Other)}
			>
				<Text
					style={
						commonStyles[gender === Gender.Other ? 'selectedGendertext' : 'gendertext']
					}
				>
					Other
				</Text>
			</TouchableOpacity>

			{/* Continue Button */}
			<TouchableOpacity style={commonStyles.button} onPress={handleSubmit}>
				<Text style={commonStyles.buttonText}>Continue</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default Selectgender;
