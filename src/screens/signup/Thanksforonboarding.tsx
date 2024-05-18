import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

import { commonStyles } from '@/component/styles'; // Import the common styles

import ASSETS from '../../../assets';

type ThanksforonboardingNavigationProp = StackNavigationProp<any, 'CompleteYourProfile'>;

const Thanksforonboarding: React.FC<{ navigation: ThanksforonboardingNavigationProp }> = ({
	navigation,
}) => {
	useEffect(() => {
		// Wait for a few seconds and then navigate to the Setuppreferences screen
		const timer = setTimeout(() => {
			navigation.navigate('Setuppreferences');
		}, 3000); // Adjust the delay time as needed (in milliseconds)

		// Clear the timer when the component unmounts
		return () => clearTimeout(timer);
	}, [navigation]);

	return (
		<SafeAreaView style={commonStyles.container}>
			{/* Icon */}
			<View style={commonStyles.iconcenter}>
				<Image
					source={ASSETS.Thanksforonboarding} // Replace with your image path
				/>
			</View>

			{/* Main Text */}
			<Text style={commonStyles.vmainText}>Thanks for onboarding</Text>

			{/* Sub Text */}
			<Text style={commonStyles.vsubText}>
				Select a few of your interests and let everyone know what you’re passionate about.
			</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	// Your component-specific styles here
});

export default Thanksforonboarding;
