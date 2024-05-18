import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shallowEqual } from 'react-redux';
import Slider from '@react-native-community/slider';
import { StackNavigationProp } from '@react-navigation/stack';

import { commonStyles } from '@/component/styles';

import { MainStackParamList } from '@/nav/MainStackNav';
import { useSaveuserMutation } from '@/store/apis';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLocation, setPreference } from '@/store/slices';
import { Preference } from '@/store/types';
import { FontStyle, LayoutStyle } from '@/styles';

type StackParamList = MainStackParamList & {
	Dhome: undefined;
};

type OnboardingNumberNavigationProp = StackNavigationProp<StackParamList, 'UserPhoto'>;

function Setuppreferences({ navigation }: { navigation: OnboardingNumberNavigationProp }) {
	const [distanceRange, setDistanceRange] = useState(50);

	const [location, cords] = useAppSelector(
		(state) => [state?.user?.location, state?.user?.cords],
		shallowEqual
	);

	const [minAge, setMinAge] = useState(18); // Add min age state

	const [maxAge, setMaxAge] = useState(50); // Add max age state

	const preference = useAppSelector((state) => state?.user?.preference, shallowEqual);

	const tempser = useAppSelector((state) => state?.tempUser, shallowEqual);

	const dispatch = useAppDispatch();

	const handlePref = (pref: Preference) => {
		dispatch(setPreference(pref));
	};

	const [save, { isLoading, error }] = useSaveuserMutation({
		fixedCacheKey: 'saveuser',
	});

	const handleSubmit = async () => {
		try {
			const data = { ...tempser, location, cords };

			// const res = await save(data);

			// // @ts-ignore
			// if (res?.error) {
			// 	throw new Error('Signin Failed');
			// }
			// await dispatch(setUser(data));
			// await dispatch(removeTempUser());
			// await dispatch(setAuthenticated(true));
			await navigation.replace('UserPhoto');
		} catch (_error) {
			Alert.alert('Error', (_error as Error)?.message);
		}
		//
	};

	useEffect(() => {
		(async () => {
			try {
				// dispatch(getLocation({}));
				const result = await dispatch(getLocation({}));

				console.log('getLocation result:', result);
			} catch (_error) {
				console.log({ _error });
			}
		})();
	}, [dispatch]);

	useEffect(() => {
		console.log({ error });
	}, [error]);

	return (
		<SafeAreaView style={LayoutStyle.fillWhite}>
			<ScrollView
				contentContainerStyle={[commonStyles.container, { flex: 0 }]}
				style={styles.container}
			>
				<Text style={commonStyles.description}>Setup preferences</Text>

				<View
					style={{
						// flex: 1,
						width: '100%',
						backgroundColor: 'white',
						paddingVertical: 18,
						borderRadius: 10,
						flex: 1,
					}}
				>
					<Text style={commonStyles.sliderLabel}>Interested in</Text>
					<View
						style={{
							borderColor: '#E8E6EA',
							backgroundColor: '#E8E6EA',
							borderRadius: 15,
							borderWidth: 1,
							flex: 1,
							height: 58,

							flexDirection: 'row',

							justifyContent: 'space-between',
							gap: 1,
						}}
					>
						<TouchableOpacity
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor:
									preference === Preference.Male ? '#F44586' : '#fff',
								borderTopLeftRadius: 15,
								borderBottomLeftRadius: 15,
								shadowColor:
									preference === Preference.Male
										? 'rgba(233, 64, 87, 0.20)'
										: 'transparent',
								shadowOpacity: 1,
								shadowOffset: {
									height: 2,
									width: 2,
								},
								shadowRadius: 15,
								elevation: 7,
							}}
							onPress={() => handlePref(Preference.Male)}
						>
							<Text
								style={{
									color: preference === Preference.Male ? '#fff' : '#1E1E1E',
									textAlign: 'center',
									fontFamily: 'OpenSans-Bold',
									fontWeight: preference === Preference.Male ? '700' : '500',
									textTransform: 'capitalize',
								}}
							>
								Male
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor:
									preference === Preference.Female ? '#F44586' : '#fff',
								shadowColor:
									preference === Preference.Female
										? 'rgba(233, 64, 87, 0.20)'
										: 'transparent',
								shadowOpacity: 1,
								shadowOffset: {
									height: 2,
									width: 2,
								},
								shadowRadius: 15,
								elevation: 7,
							}}
							onPress={() => handlePref(Preference.Female)}
						>
							<Text
								style={{
									color: preference === Preference.Female ? '#fff' : '#1E1E1E',
									textAlign: 'center',
									fontFamily: 'OpenSans-Bold',
									fontWeight: preference === Preference.Female ? '700' : '500',
									textTransform: 'capitalize',
								}}
							>
								Female
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor:
									preference === Preference.Both ? '#F44586' : '#fff',
								borderTopRightRadius: 15,
								borderBottomRightRadius: 15,
								shadowColor:
									preference === Preference.Both
										? 'rgba(233, 64, 87, 0.20)'
										: 'transparent',
								shadowOpacity: 1,
								shadowOffset: {
									height: 2,
									width: 2,
								},
								shadowRadius: 15,
								elevation: 7,
							}}
							onPress={() => handlePref(Preference.Both)}
						>
							<Text
								style={{
									color: preference === Preference.Both ? '#fff' : '#1E1E1E',
									textAlign: 'center',
									fontFamily: 'OpenSans-Bold',
									fontWeight: preference === Preference.Both ? '700' : '500',
									textTransform: 'capitalize',
								}}
							>
								Both
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={commonStyles.inputcolum}>
					<Text style={commonStyles.sliderLabel}> Location</Text>

					<TextInput
						style={commonStyles.input}
						placeholder="Enter location"
						value={location}
						editable={false}
					/>
				</View>
				<View style={commonStyles.inputcolum}>
					<Text style={commonStyles.sliderLabel}>
						Distance Range:
						{distanceRange} km
					</Text>
					<Slider
						style={commonStyles.slider}
						minimumValue={0}
						maximumValue={100}
						step={1}
						value={distanceRange}
						onValueChange={(value) => setDistanceRange(value)}
						maximumTrackTintColor="#C6CAD4"
						minimumTrackTintColor="#F44586"
						thumbTintColor="#F44586"
					/>
				</View>

				<View style={commonStyles.inputcolum}>
					<Text style={commonStyles.sliderLabel}>Age: </Text>
					<Text style={commonStyles.label}>
						Min:
						{minAge}
					</Text>

					<Slider
						style={commonStyles.slider}
						minimumValue={18}
						maximumValue={100}
						step={1}
						value={minAge}
						onValueChange={(value) => setMinAge(value)}
						maximumTrackTintColor="#C6CAD4"
						minimumTrackTintColor="#F44586"
						thumbTintColor="#F44586"
					/>
				</View>

				<View style={commonStyles.inputcolum}>
					<Text style={commonStyles.label}>
						Max:
						{maxAge}
					</Text>
					<Slider
						style={commonStyles.slider}
						minimumValue={18}
						maximumValue={100}
						step={1}
						value={maxAge}
						onValueChange={(value) => setMaxAge(value)}
						maximumTrackTintColor="#C6CAD4"
						minimumTrackTintColor="#F44586"
						thumbTintColor="#F44586"
					/>
				</View>

				{/* <MapView
					region={{
						latitude: cords?.latitude,
						longitude: cords?.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
						// latitudeDelta:
					}}
					style={{ width: '100%', height: 200, marginBottom: 10 }}
				/> */}
				<RectButton
					onPress={handleSubmit}
					style={{
						backgroundColor: '#F44586',
						borderRadius: 10,
						paddingHorizontal: 20,
						paddingVertical: 10,
						width: '100%',
						alignItems: 'center',
						flexDirection: 'row',
						gap: 5,
						justifyContent: 'center',
					}}
				>
					{isLoading ? <ActivityIndicator color={'white'} size={'small'} /> : null}
					<Text style={[commonStyles.buttonText, FontStyle['opensans-600']]}>
						Continue
					</Text>
				</RectButton>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		padding: 16,
	},
});

export default Setuppreferences;
