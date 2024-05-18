import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { commonStyles } from '@/component/styles';

import { MainStackParamList } from '@/nav/MainStackNav';
import { useAppDispatch } from '@/store/hooks';
import { setOnboarding } from '@/store/slices';

const OnboardingFooter = ({ text }: { text: string }) => {
	const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

	const dispatch = useAppDispatch();

	const handleSignIn = () => {
		dispatch(setOnboarding(true));
		navigation.navigate('LoginType');
	};

	const handleCreateAccount = () => {
		dispatch(setOnboarding(true));
		navigation.navigate('SignUpType');
	};

	return (
		<View
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				// gap: 20,
				width: '100%',
				padding: 40,
				flex: 0.2,
			}}
		>
			<RectButton style={styles.button} onPress={handleCreateAccount}>
				<Text style={commonStyles.buttonText}>Create an account</Text>
			</RectButton>

			<View style={commonStyles.alway}>
				<Text style={commonStyles.smText}>Already have an account? </Text>
				<RectButton onPress={handleSignIn}>
					<Text style={commonStyles.smTextl}>Sign In</Text>
				</RectButton>
			</View>
		</View>
	);
};

export default OnboardingFooter;

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		backgroundColor: '#F44586',
		borderRadius: 10,
		gap: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		textAlign: 'left',
		width: '100%',
	},
});
