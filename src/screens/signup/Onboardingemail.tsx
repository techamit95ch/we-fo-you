import { Text, TextInput, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shallowEqual } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack'; // Import the appropriate type

import { commonStyles } from '@/component/styles';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTempEmail } from '@/store/slices';

// Define the stack navigator type

type StackParamList = {
	OTPScreenph: undefined; // Add 'OTPScreenph' to the screen names
};

// Define the navigation prop type
type OnboardingNumberNavigationProp = StackNavigationProp<StackParamList, 'OTPScreenph'>;

function Onboardingemail({ navigation }: { navigation: OnboardingNumberNavigationProp }) {
	const email = useAppSelector((state) => state?.tempUser?.email, shallowEqual);

	const tempUser = useAppSelector((state) => state?.tempUser, shallowEqual);

	console.log({ email });
	console.log({ tempUser });

	const dispatch = useAppDispatch();

	const handleSubmit = () => {
		if (email) {
			navigation.navigate('OTPScreenph');
		}
	};

	return (
		<SafeAreaView style={commonStyles.container}>
			<Text style={commonStyles.description}>Sign up With Email !</Text>
			<Text style={commonStyles.Subdescription}>
				Create your over account so that you can enjoy the experience of the application
			</Text>

			<View style={commonStyles.inputcolum}>
				<TextInput
					placeholder="Email id"
					style={commonStyles.input}
					value={email}
					onChangeText={(text) => dispatch(setTempEmail(text))}
					keyboardType="email-address"
				/>
			</View>

			<RectButton onPress={handleSubmit} style={commonStyles.button}>
				<Text style={commonStyles.buttonText}>Continue</Text>
			</RectButton>
		</SafeAreaView>
	);
}

export default Onboardingemail;
