import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack'; // Import the appropriate type
import { commonStyles } from '@/component/styles';

// Define the stack navigator type

type StackParamList = {
	OTPScreenph: undefined; // Add 'OTPScreenph' to the screen names
};

// Define the navigation prop type
type OnboardingNumberNavigationProp = StackNavigationProp<StackParamList, 'OTPScreenph'>;

function OnboardingNumber({ navigation }: { navigation: OnboardingNumberNavigationProp }) {
	const [phoneNumber, setPhoneNumber] = useState('');

	const handleSubmit = () => {
		navigation.navigate('OTPScreenph');
	};

	return (
		<SafeAreaView style={commonStyles.container}>
			<Text style={commonStyles.description}>We’re so glad you’re here!</Text>
			<Text style={commonStyles.Subdescription}>
				Create your over account so that you can enjoy the experience of the application
			</Text>

			<View style={commonStyles.inputRow}>
				<TextInput
					placeholder="+91"
					style={commonStyles.input_code}
					value={phoneNumber}
					onChangeText={(text) => setPhoneNumber(text)}
					keyboardType="phone-pad" // To show the numeric keyboard
				/>
				<TextInput
					placeholder="Phone Number"
					style={commonStyles.input_Number}
					value={phoneNumber}
					onChangeText={(text) => setPhoneNumber(text)}
					keyboardType="phone-pad" // To show the numeric keyboard
				/>
			</View>

			<Pressable onPress={handleSubmit} style={commonStyles.button}>
				<Text style={commonStyles.buttonText}>Continue</Text>
			</Pressable>
		</SafeAreaView>
	);
}

export default OnboardingNumber;
