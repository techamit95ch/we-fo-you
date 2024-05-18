import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

import { commonStyles } from '@/component/styles';

import { LayoutStyle } from '@/styles';
import ASSETS from '../../../assets';

// Define the stack navigator type

type StackParamList = {
	CompleteYourProfile: undefined; // Add 'OTPScreenph' to the screen names
};

// Define the navigation prop type
type OnboardingNumberNavigationProp = StackNavigationProp<StackParamList, 'CompleteYourProfile'>;

function VerificationSuccessful({ navigation }: { navigation: OnboardingNumberNavigationProp }) {
	const handleSubmit = () => {
		// Here, you can handle the submission logic for the phone number
		// For this example, we'll just log the entered phone number

		// You can navigate to the next screen here
		// Replace 'NextScreen' with the actual screen name
		navigation.navigate('CompleteYourProfile');
	};

	return (
		<SafeAreaView
			style={[commonStyles.container, { alignItems: 'center', justifyContent: 'center' }]}
		>
			<View
				style={[
					LayoutStyle.fill,
					// LayoutStyle.center,
					{
						alignItems: 'center',
						justifyContent: 'center',
						gap: 20,
						width: '100%',
						padding: 40,
					},
				]}
			>
				{/* Icon */}
				<View
					style={{
						padding: 0,
						// width: '100%',
						alignSelf: 'center',
						justifyContent: 'center',
					}}
				>
					<Image
						source={ASSETS.Success} // Replace with your image path
						// style={commonStyles.iconcenter}
					/>
				</View>

				{/* Main Text */}
				<Text style={commonStyles.vmainText}>Verification Successful</Text>

				{/* Sub Text */}
				<Text style={commonStyles.vsubText}>You now have full access to our system</Text>

				{/* Button */}
				<RectButton
					style={[commonStyles.button, LayoutStyle.center, { width: '100%' }]}
					onPress={handleSubmit}
				>
					<Text style={commonStyles.buttonText}>Let’s Combat!</Text>
				</RectButton>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	// Your component-specific styles here
});

export default VerificationSuccessful;
