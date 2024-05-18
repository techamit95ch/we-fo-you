import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

import { commonStyles } from '@/component/styles';

import { useAppDispatch } from '@/store/hooks';
import { setTempPassword } from '@/store/slices';

// Define the navigation param list type
type StackParamList = {
	Oninterests: undefined; // Add more screen names and parameters as needed
};

// Define the navigation prop type
type SetpasswordProps = {
	navigation: StackNavigationProp<StackParamList, 'Oninterests'>;
};

const Setpassword = ({ navigation }: SetpasswordProps) => {
	const [pwd, setPwd] = useState(''); // State for the password

	const [cpwd, setCpwd] = useState(''); // State for the confirmed password

	const dispatch = useAppDispatch();

	const handleGetStartedPress = () => {
		// You can add validation logic for the fields here
		if (pwd && cpwd && pwd === cpwd) {
			// Navigate to the GenderSelectionScreen (Selectgender)
			dispatch(setTempPassword(pwd));
			navigation.navigate('Oninterests');
		} else {
			// Display an error message or handle the incomplete form
			console.log('Please fill out all fields and ensure passwords match');
		}
	};

	return (
		<SafeAreaView style={commonStyles.container}>
			{/* Main Text */}
			<Text style={commonStyles.description}>Create Your Password!</Text>

			{/* Text Input for Password */}
			<TextInput
				style={commonStyles.input}
				placeholder="Password"
				secureTextEntry={true} // Mask the input as a password
				value={pwd}
				onChangeText={(text) => setPwd(text)}
			/>

			{/* Text Input for Confirm Password */}
			<TextInput
				style={commonStyles.input}
				placeholder="Confirm Password"
				secureTextEntry={true} // Mask the input as a password
				value={cpwd}
				onChangeText={(text) => setCpwd(text)}
			/>

			{/* Button */}
			<Pressable onPress={handleGetStartedPress} style={commonStyles.button}>
				<Text style={commonStyles.buttonText}>Continue</Text>
			</Pressable>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	// Your additional styles can go here if needed
});

export default Setpassword;
