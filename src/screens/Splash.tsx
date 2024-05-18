import { useEffect } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ASSETS from '../../assets';

// Define the stack navigator type
type StackParamList = {
	LoginType: undefined;
	// Add other screens here if needed
};

// Define the navigation prop type
type SplashScreenNavigationProp = StackNavigationProp<StackParamList, 'LoginType'>;

const Splash = () => {
	const navigation = useNavigation<SplashScreenNavigationProp>();

	useEffect(() => {
		// Simulate a loading delay (you can replace this with actual loading logic)
		setTimeout(() => {
			navigation.replace('AppIntro');
		}, 2000); // Adjust the delay as needed
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<Image source={ASSETS.splash} style={styles.image} />
			<Text style={styles.text}>Your App Name</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: 'white',
		flex: 1,
		justifyContent: 'center',
	},
	image: {
		height: 200,
		width: 200,
	},
	text: {
		fontSize: 24,
		marginTop: 16,
	},
});

export default Splash;
