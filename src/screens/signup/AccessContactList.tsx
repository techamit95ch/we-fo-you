import { useCallback } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Contacts from 'expo-contacts';

import { commonStyles } from '@/component/styles';
import { MainStackParamList } from '@/nav/MainStackNav';
import Animated from 'react-native-reanimated';
import ASSETS from '../../../assets';

type StackParamList = MainStackParamList;

type OnboardingNumberNavigationProp = StackNavigationProp<StackParamList, 'AccessContactList'>;

const AccessContactList = ({ navigation }: { navigation: OnboardingNumberNavigationProp }) => {
	const getContacts = useCallback(async () => {
		try {
			const { status } = await Contacts.requestPermissionsAsync();

			console.log({ status });
			if (status === 'granted') {
				const { data } = await Contacts.getContactsAsync({
					fields: [Contacts.Fields.Emails],
				});

				console.log({ data });

				if (data.length > 0) {
					const contact = data[0];

					console.log(contact);
				}
			}
		} catch (error) {
			Alert.alert("Sorry can't get contacts", (error as Error)?.message);
		} finally {
			await navigation.replace('EnableNotification');
		}
	}, [navigation]);

	return (
		<SafeAreaView style={[commonStyles.container]}>
			<Text style={commonStyles.description}>Search friends</Text>
			<View style={{ flex: 1, alignItems: 'center', gap: 20, justifyContent: 'center' }}>
				<Animated.Image
					resizeMode="cover"
					style={{ width: 240, height: 240 }}
					source={ASSETS.people}
				/>
			</View>

			<TouchableOpacity
				style={[
					commonStyles.button,
					{
						flexDirection: 'row',
						gap: 10,
						marginBottom: 10,
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

export default AccessContactList;

const styles = StyleSheet.create({});
