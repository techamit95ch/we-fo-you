import { useCallback } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

import commonStyles from '@/component/styles';
import { MainStackParamList } from '@/nav/MainStackNav';
import Animated from 'react-native-reanimated';
import ASSETS from '../../../assets';

type StackParamList = MainStackParamList;

type OnboardingNumberNavigationProp = StackNavigationProp<StackParamList, 'EnableNotification'>;

const EnableNotification = ({ navigation }: { navigation: OnboardingNumberNavigationProp }) => {
	const getContacts = useCallback(async () => {
		try {
		} catch (error) {
			Alert.alert("Sorry can't get contacts", (error as Error)?.message);
		} finally {
			await navigation.replace('Dhome');
		}
	}, [navigation]);

	return (
		<SafeAreaView style={[commonStyles.container]}>
			<Text style={commonStyles.description}>Enable notifications</Text>
			<View style={{ flex: 1, alignItems: 'center', gap: 20, justifyContent: 'center' }}>
				<Animated.Image
					resizeMode="cover"
					style={{ width: 240, height: 240 }}
					source={ASSETS.chat}
				/>
			</View>

			<TouchableOpacity
				style={[
					commonStyles.button,
					{
						flexDirection: 'row',
						gap: 10,
						alignItems: 'center',
						justifyContent: 'center',
					},
				]}
				onPress={getContacts}
			>
				<Text style={commonStyles.buttonText}>Continue</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[
					commonStyles.button,
					{
						flexDirection: 'row',
						gap: 10,
						marginTop: 10,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#fff',
					},
				]}
				onPress={() => navigation.replace('Dhome')}
			>
				<Text style={[commonStyles.buttonText, { color: '#F44586' }]}>Skip</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default EnableNotification;

const styles = StyleSheet.create({});
