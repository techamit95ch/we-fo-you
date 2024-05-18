import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

import { commonStyles } from '@/component/styles';

import ASSETS from '../../assets';
import LoadingComponent from '@/component/LoadingComponent';

type ThanksforonboardingNavigationProp = StackNavigationProp<any, 'Dhome'>;

const Loading: React.FC<{ navigation: ThanksforonboardingNavigationProp }> = ({ navigation }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			navigation?.navigate('Dhome');
		}, 2000);
		return () => clearTimeout(timer);
	}, [navigation]);

	return <LoadingComponent />;
};

const styles = StyleSheet.create({
	logo: {
		width: 216, // Set the width to your desired size
		height: 49, // Set the height to your desired size
		resizeMode: 'contain', // Adjust the resizeMode as needed
		marginBottom: 20, // Add margin to separate the logo from other elements
	},
	// Your component-specific styles here
});

export default Loading;
