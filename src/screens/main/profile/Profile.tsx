import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';

import { window } from '@/constants';
import Animated from 'react-native-reanimated';
import { customTransition } from '@/utils';
import ALL_STYLES, { FontSizeColorStyle, LayoutStyle } from '@/styles';
import DEMO from '@/data/demo';
import { useGetUserQuery } from '@/store/apis';

const interests = ['Interest 1', 'Interest 2', 'Interest 3', 'Interest 4', 'Interest 5'] as const;

const Profile = ({ navigation, route }: { navigation: any; route: any }) => {
	const params = route?.params;

	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

	const { data } = useGetUserQuery({ userId: params?.id });

	const handleInterestPress = (interest: string) => {
		if (selectedInterests.includes(interest)) {
			setSelectedInterests((prevSelectedInterests) =>
				prevSelectedInterests.filter((item) => item !== interest)
			);
		} else {
			if (selectedInterests.length < 10) {
				setSelectedInterests((prevSelectedInterests) => [
					...prevSelectedInterests,
					interest,
				]);
			}
		}
	};

	return (
		<Animated.View style={ALL_STYLES.bg}>
			<Animated.Image
				style={{ height: window?.height / 2, width: window.width }}
				source={{ uri: params?.img || data?.avatar }}
				sharedTransitionTag={params?.id}
				resizeMode={'cover'}
			/>

			<Animated.ScrollView style={styles.bg} contentContainerStyle={{ gap: 20 }}>
				<Animated.View>
					<Animated.Text style={FontSizeColorStyle['opensans-600-20-black']}>
						{params?.name || data?.name || 'JP'}
					</Animated.Text>
					<Animated.Text style={FontSizeColorStyle['opensans-400-12-black']}>
						{params?.occupation || 'Professional model'}
					</Animated.Text>
				</Animated.View>
				<Animated.View style={[LayoutStyle.row, LayoutStyle.between]}>
					<Animated.Text
						style={[
							FontSizeColorStyle['opensans-400-12-black'],
							{ color: 'rgba(0, 0, 0, 0.70)' },
						]}
					>
						{params?.city || data?.city || 'Chicago, IL United States'}
					</Animated.Text>
					<TouchableOpacity
						style={[
							LayoutStyle.row,
							{
								padding: 6,
								borderRadius: 4,
								borderWidth: 1,
								borderColor: '#F7D8DC',
								position: 'relative',
								shadowColor: '#F7D8DC',
								shadowOffset: {
									width: 1,
									height: 1,
								},
								shadowOpacity: 1,
								shadowRadius: 2,
								elevation: 30,
								backgroundColor: '#F7D8DC',
								alignItems: 'center',
								gap: 4,
							},
						]}
					>
						<Entypo name="location" size={14} color="#F44586" />
						<Text style={FontSizeColorStyle['opensans-400-xs-primary']}>
							{params?.distance || '1Km'}
						</Text>
					</TouchableOpacity>
				</Animated.View>
				<View style={{ gap: 8 }}>
					<Text style={FontSizeColorStyle['opensans-700-16-black']}>About</Text>
					<Text
						style={[
							FontSizeColorStyle['opensans-400-12-black'],
							{ color: 'rgba(0, 0, 0, 0.70)' },
						]}
					>
						{data?.about ||
							`My name is ${params?.name} and I enjoy meeting new people and finding ways to
						help them have an uplifting experience. I enjoy reading..`}
					</Text>
				</View>
				<View style={{ gap: 8 }}>
					<View style={[LayoutStyle.row, LayoutStyle.between]}>
						<Text style={FontSizeColorStyle['opensans-700-16-black']}>Galary</Text>
						<TouchableOpacity
							style={{
								borderRadius: 5,
								paddingHorizontal: 7,
								paddingVertical: 4,
								shadowColor: '#F7D8DC',
								shadowOffset: {
									width: 1,
									height: 1,
								},
								shadowOpacity: 1,
								shadowRadius: 2,
								elevation: 30,
								backgroundColor: '#F7D8DC',
								alignItems: 'center',
							}}
							onPress={() => navigation.navigate('Galary')}
						>
							<Text style={FontSizeColorStyle['opensans-400-sm-primary']}>More</Text>
						</TouchableOpacity>
					</View>

					<View style={{ gap: 12, flexDirection: 'row', flex: 1 }}>
						{data?.albums?.map((item) => (
							<Animated.Image
								source={item ? { uri: item } : image}
								style={{ height: 120, width: 80, borderRadius: 4 }}
							/>
						))}

						{/* <Animated.Image
							source={image}
							style={{ height: 120, width: 80, borderRadius: 4 }}
						/>
						<Animated.Image
							source={image}
							style={{ height: 120, width: 80, borderRadius: 4 }}
						/>
						<Animated.Image
							source={image}
							style={{ height: 120, width: 80, borderRadius: 4 }}
						/> */}
					</View>
				</View>
				<View style={{ gap: 8 }}>
					<Text style={FontSizeColorStyle['opensans-700-16-black']}>Interests</Text>
					<View>
						<View style={{ flex: 1, width: '100%', gap: 0, flexDirection: 'row' }}>
							<Text>
								{data?.interest?.map((item) => (
									<View style={{ padding: 2 }}>
										<TouchableOpacity
											// key={index?.toString()}
											onPress={() => handleInterestPress(item)}
											style={[
												{
													borderColor: '#F44586',
													borderRadius: 5,
													borderWidth: 1,
													paddingHorizontal: 7,
													paddingVertical: 4,

													alignItems: 'center',
													justifyContent: 'center',
												},
												selectedInterests.includes(item)
													? { backgroundColor: '#F44586' }
													: {},
											]}
										>
											<Text
												style={[
													FontSizeColorStyle['opensans-400-sm-black'],
													{
														color: selectedInterests.includes(item)
															? '#fff'
															: '#1E1E1E',
													},
												]}
												numberOfLines={1}
											>
												{item}
											</Text>
										</TouchableOpacity>
									</View>
								))}
							</Text>
						</View>
					</View>
				</View>
			</Animated.ScrollView>
			<View style={styles.actionsContainer}>
				<TouchableOpacity
					style={styles.crossButton}
					// onPress={() => handleSwipe('left')}
				>
					<Entypo name="cross" size={24} color="#F27121" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.heartButton}
					// onPress={() => handleSwipe('right')}
				>
					<Entypo name="heart" size={35} color="white" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.messageButton}
					onPress={() =>
						navigation.navigate('Message', {
							to: params?.id,
							name: params?.name,
							avatar: params?.img || data?.avatar,
						})
					}
				>
					<Entypo name="message" size={24} color="#F44586" />
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	bg: {
		position: 'absolute',
		backgroundColor: '#ffffff',
		width: '100%',
		bottom: 0,
		height: window?.height / 2 + 30,
		borderTopEndRadius: 30,
		borderTopStartRadius: 30,
		padding: 25,
		paddingTop: 35,
	},
	actionsContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 20,
		justifyContent: 'center',
		paddingVertical: 15,
		position: 'absolute',
		bottom: 5,
		width: '100%',
	},
	heartButton: {
		backgroundColor: '#F44586',
		borderRadius: 100,
		elevation: 5,
		padding: 13,
		shadowColor: '#F44586',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.51,
		shadowRadius: 5,
	},
	messageButton: {
		backgroundColor: 'white',
		borderRadius: 100,
		elevation: 2,
		padding: 10,
		shadowColor: '#F44586',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.51,
		shadowRadius: 2,
	},
	crossButton: {
		backgroundColor: 'white',
		borderRadius: 100,
		elevation: 2,
		padding: 10,
		shadowColor: 'red',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.51,
		shadowRadius: 2,
	},
} as const);
