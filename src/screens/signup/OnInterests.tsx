import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shallowEqual } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import { useGetInterestsQuery } from '@/store/apis';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTempInterest } from '@/store/slices';
import { InterestType } from '@/store/types';
import { FontSizeColorStyle } from '@/styles';
import commonStyles from '@/component/styles';

// Define the navigation param list type
type StackParamList = {
	Thanksforonboarding: undefined; // Replace with the actual screen name
};

// Define the navigation prop type
type OnInterestsProps = {
	navigation: StackNavigationProp<StackParamList>;
};
// const interests = [
// 	'Interest 1',
// 	'Interest 2',
// 	'Interest 3',
// 	'Interest 4',
// 	'Interest 5',
// 	'Interest 6',
// 	'Interest 7',
// 	'Interest 8',
// 	'Interest 9',
// 	'Interest 10',
// 	'Interest 11',
// 	// Add more interests here
// ] as const;

const Oninterests: React.FC<OnInterestsProps> = ({ navigation }) => {
	const { data: interests = [], isLoading, isFetching } = useGetInterestsQuery({});

	console.log({ interests });

	const selectedInterests = useAppSelector(
		(state) => state?.tempUser?.interests || [],
		shallowEqual
	);

	const dispatch = useAppDispatch();

	const handleInterestPress = (interest: InterestType) => {
		console.log({ interest });

		dispatch(setTempInterest(interest));
	};

	console.log({ selectedInterests });

	const handleContinuePress = () => {
		navigation.navigate('Thanksforonboarding');
	};

	return (
		<SafeAreaView
			style={[
				{
					backgroundColor: '#fff',
					flex: 1,
					paddingHorizontal: 40,
					paddingVertical: 100,
					// paddingBottom: 100,
					gap: 20,
				},
			]}
		>
			<Text style={FontSizeColorStyle['opensans-400-36-black']}>Your interests</Text>
			<FlatList
				contentContainerStyle={{ width: '100%', gap: 20 }}
				style={{ flex: 1 }}
				numColumns={2}
				columnWrapperStyle={{ gap: 20 }}
				data={interests}
				// keyExtractor={()=>}
				renderItem={({ item }) => (
					<RectButton
						// key={index?.toString()}
						onPress={() => handleInterestPress(item)}
						style={[
							{
								borderColor: '#F44586',
								borderRadius: 15,
								borderWidth: 1,
								flex: 1,
								height: 45,
								// width: '100%',
								// display: 'flex',
								// alignItems: 'center',
								// justifyContent: 'center',
								shadowColor: 'rgba(233, 64, 87, 0.20)',
								shadowOpacity: 1,
								shadowOffset: {
									height: 2,
									width: 2,
								},
								shadowRadius: 15,
								elevation: 7,
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: selectedInterests?.includes(item)
									? '#F44586'
									: '#f6f7f8',
							},
						]}
					>
						<Text
							style={[
								{
									color: selectedInterests.includes(item) ? '#fff' : '#1E1E1E',
									textAlign: 'center',
									fontFamily: 'OpenSans-Bold',
									fontWeight: selectedInterests.includes(item) ? '700' : '500',
									textTransform: 'capitalize',
								},
							]}
						>
							{item.name}
						</Text>
					</RectButton>
				)}
			/>

			<RectButton onPress={handleContinuePress} style={commonStyles.button}>
				<Text style={commonStyles.buttonText}>Continue</Text>
			</RectButton>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default Oninterests;
