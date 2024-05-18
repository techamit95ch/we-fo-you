/* eslint-disable react-native/no-unused-styles */
import { useRef, useState } from 'react';
import { Clipboard, StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import OTPTextView from 'react-native-otp-textinput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { commonStyles } from '@/component/styles'; // Import the common styles

function OTPScreenph() {
	const [otp, setOTP] = useState('');

	const input = useRef<OTPTextView>(null);

	const navigation = useNavigation(); // Use the useNavigation hook to get the navigation prop

	const handleVerifyOTP = () => {
		// Verify the entered OTP (you can implement your OTP verification
		navigation.navigate('VerificationSuccessful'); // Replace with the
	};

	const handleCellTextChange = async (text: string, i: number) => {
		if (i === 0) {
			const clippedText = await Clipboard.getString();

			if (clippedText.slice(0, 1) === text) {
				input.current?.setValue(clippedText, true);
			}
		}
	};

	return (
		<SafeAreaView style={commonStyles.container}>
			<Text style={commonStyles.description}>My Code is</Text>
			<Text style={commonStyles.Subdescription}>
				Please enter your valid phone number. We will send you a 4-digit code to verify your
				account.
			</Text>
			{/* <OTPInputView
				style={{ width: '100%', height: 200 }}
				pinCount={4}
				// code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
				// onCodeChanged = {code => { this.setState({code})}}
				autoFocusOnLoad
				codeInputFieldStyle={styles.underlineStyleBase}
				codeInputHighlightStyle={styles.underlineStyleHighLighted}
				onCodeFilled={(code) => {
					// console.log(`Code is ${code}, you are good to go!`);
					setOTP(code);
				}}
			/> */}
			<OTPTextView
				ref={input}
				// style={styles.underlineStyleHighLighted}
				containerStyle={styles.textInputContainer}
				textInputStyle={styles.underlineStyleHighLighted}
				// codeInputFieldStyle={styles.underlineStyleHighLighted}
				handleTextChange={setOTP}
				handleCellTextChange={handleCellTextChange}
				inputCount={4}
				keyboardType="numeric"
				selectionColor="#F44586"
				clearInputs
			/>

			<RectButton onPress={handleVerifyOTP} style={commonStyles.button}>
				<Text style={commonStyles.buttonText}>Verify OTP</Text>
			</RectButton>
		</SafeAreaView>
	);
}

export default OTPScreenph;

const styles = StyleSheet.create({
	borderStyleBase: {
		height: 45,
		width: 30,
	},

	borderStyleHighLighted: {
		borderColor: '#F44586',
	},

	buttonWrapper: {
		flexDirection: 'row',
		gap: 20,
		justifyContent: 'space-around',
		marginBottom: 20,
		width: '60%',
	},

	container: {
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		justifyContent: 'center',
		padding: 5,
		paddingVertical: 20,
	},
	instructions: {
		color: '#333333',
		fontSize: 18,
		fontWeight: '500',
		marginBottom: 10,
		textAlign: 'center',
	},
	roundedTextInput: {
		borderRadius: 10,
		borderWidth: 4,
	},
	safeAreaView: {
		flex: 1,
	},
	textInput: {
		borderColor: '#F44586',
		borderWidth: 1,
		fontSize: 16,
		height: 40,
		letterSpacing: 5,
		marginBottom: 10,
		padding: 10,
		textAlign: 'center',
		width: '80%',
	},
	textInputContainer: {
		borderColor: '#F44586',
		marginBottom: 20,
	},
	underlineStyleBase: {
		borderBottomWidth: 1,
		borderWidth: 0,
		color: 'black',
		fontWeight: '600',
		height: 45,
		width: 30,
	},
	underlineStyleHighLighted: {
		borderColor: '#F44586',
	},
	welcome: {
		fontSize: 20,
		margin: 10,
		textAlign: 'center',
	},
});
