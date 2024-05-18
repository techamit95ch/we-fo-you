import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

import { commonStyles } from '@/component/styles';
import { useLoginMutation } from '@/store/apis';
import { useAppDispatch } from '@/store/hooks';
import { setUser, removeTempUser, setAuthenticated } from '@/store/slices';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import ASSETS from '../../../assets';

type StackParamList = {
	Loading: undefined;
};

type OnboardingNumberNavigationProp = StackNavigationProp<StackParamList, 'Loading'>;

function Loginemail({ navigation }: { navigation: OnboardingNumberNavigationProp }) {
	const [email, setEmail] = useState('');

	const [password, setPassword] = useState('');

	const dispatch = useAppDispatch();

	const [save, { isLoading, error }] = useLoginMutation({
		fixedCacheKey: 'login',
	});

	const handleSubmit = async () => {
		try {
			const data = { email: email?.toLowerCase()?.trim(), password };

			const res = await save(data);

			// @ts-ignore
			if (res?.error) {
				// @ts-ignore
				throw new Error(res?.error?.data?.message);
			}
			await dispatch(setUser({ ...data, ...res?.data }));
			await dispatch(removeTempUser());
			await dispatch(setAuthenticated(true));
			await navigation.replace('Loading');
		} catch (_error) {
			Alert.alert('Error', (_error as Error)?.message);
		}
		//
	};
	// const handleSubmit = () => {
	// 	// Here, you can handle the submission logic for the email and password
	// 	// For this example, we'll just log the entered email and password
	// 	console.log('Email:', email);
	// 	console.log('Password:', password);

	// 	// You can navigate to the next screen here
	// 	// Replace 'NextScreen' with the actual screen name
	// 	navigation.navigate('Loading');
	// };

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
				/>
				<View style={commonStyles.inputcolum}>
					<TextInput
						placeholder="Email id"
						style={commonStyles.input}
						value={email}
						onChangeText={(text) => setEmail(text)}
						keyboardType="email-address"
					/>
				</View>
				<View style={commonStyles.inputcolum}>
					<TextInput
						placeholder="Password"
						style={commonStyles.input}
						value={password}
						onChangeText={(text) => setPassword(text)}
						secureTextEntry={true}
					/>
				</View>
				<View style={{ flex: 1 }} />
				<RectButton
					onPress={handleSubmit}
					style={[commonStyles.button]}
					enabled={!isLoading}
				>
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
		resizeMode: 'contain', // Adjust the resizeMode as needed
		marginBottom: 20, // Add margin to separate the logo from other elements
	},
});

export default Loginemail;
