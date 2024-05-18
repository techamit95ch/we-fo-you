import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

import { commonStyles } from '@/component/styles';
import ASSETS from '../../../assets';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

type StackParamList = {
	Loading: undefined;
};

type OnboardingNumberNavigationProp = StackNavigationProp<StackParamList, 'Loading'>;

function LoginNumber({ navigation }: { navigation: OnboardingNumberNavigationProp }) {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [country, setCountry] = useState('+91');

	const [password, setPassword] = useState('');

	const handleSubmit = () => {
		// Here, you can handle the submission logic for the phone number and password
		// For this example, we'll just log the entered phone number and password
		console.log('Phone Number:', phoneNumber);
		console.log('Password:', password);

		// You can navigate to the next screen here
		// Replace 'NextScreen' with the actual screen name
		navigation.navigate('Loading');
	};

	return (
		<SafeAreaView style={[commonStyles.container]}>
			<ScrollView
				style={{ flex: 1, width: '100%' }}
				contentContainerStyle={{ flexGrow: 1, width: '100%', alignItems: 'center' }}
				keyboardShouldPersistTaps
				keyboardDismissMode="interactive"
				automaticallyAdjustKeyboardInsets
			>
				<Image
					source={ASSETS.wefoyou} // Replace with the actual path to
					style={styles.logo}
					resizeMode="contain"
				/>

				<View style={commonStyles.inputRow}>
					<TextInput
						placeholder="+91"
						style={commonStyles.input_code}
						value={country}
						onChangeText={setCountry}
						keyboardType="phone-pad"
						editable={false}
					/>
					<TextInput
						placeholder="Phone Number"
						style={commonStyles.input_Number}
						value={phoneNumber}
						onChangeText={(text) => setPhoneNumber(text)}
						keyboardType="phone-pad"
					/>
				</View>

				{/* Password Input */}
				<TextInput
					placeholder="Password"
					style={commonStyles.input}
					value={password}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry={true}
				/>
				<View style={{ flex: 1 }} />

				<RectButton onPress={handleSubmit} style={commonStyles.button}>
					<Text style={commonStyles.buttonText}>Continue</Text>
				</RectButton>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	logo: {
		width: 216, // Set the width to your desired size
		height: 49, // Set the height to your desired size
		marginBottom: 20, // Add margin to separate the logo from other elements
	},
});

export default LoginNumber;
