/* eslint-disable react-native/sort-styles */
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';
import Animated, {
	Extrapolate,
	interpolate,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/core';

import { window } from '@/constants';
import { FontSizeColorStyle } from '@/styles';
import { customTransition, isAndroid } from '@/utils';

const height = window.height;

const cardWidth = window.width * 0.9;

const cardHeight = height * 0.8;

export type TinderType = {
	img?: string;
	name?: string;
	distance?: string;
	city?: string;
	occupation?: string;
	id?: string | number;
};

const TinderItem: React.FC<
	TinderType & {
		index: number;
		handleSwipe: (direction: 'left' | 'right' | 'top' | 'bottom') => Promise<void>;
	}
> = ({
	img,
	distance = '1 KM',
	name = 'Name',
	occupation = 'Occupation',
	city,
	index,
	handleSwipe,
	id,
}) => {
	const translateX = useSharedValue(0);

	const navigation = useNavigation();

	const translateY = useSharedValue(0);

	const isCardActive = useSharedValue(true);

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, context) => {
			try {
				context.startX = translateX.value;
				context.startY = translateY.value;
			} catch (error) {
				console.log(error);
			}
		},
		onActive: (event, context) => {
			try {
				translateX.value = context.startX + event.translationX;
				translateY.value = context.startY + event.translationY;
			} catch (error) {
				console.log(error);
			}
		},
		onEnd: (_, context) => {
			try {
				const deltaX = translateX.value;

				const deltaY = translateY.value;

				// if (Math.abs(deltaX) > Math.abs(deltaY)) {
				// 	runOnJS(handleSwipe)(deltaX > 0 ? 'right' : 'left', index);
				// } else {
				// 	runOnJS(handleSwipe)(deltaY > 0 ? 'bottom' : 'top', index);
				// }

				if (deltaX > cardWidth * 0.7) {
					runOnJS(handleSwipe)('right', index);
				}
				if (deltaX < -cardWidth * 0.7) {
					runOnJS(handleSwipe)('left', index);
				}
				if (deltaY < -cardHeight * 0.5) {
					runOnJS(handleSwipe)('top', index);
				}
				if (deltaY > cardHeight * 0.5) {
					runOnJS(handleSwipe)('bottom', index);
				}

				translateX.value = withSpring(0, { damping: 15, stiffness: 90 });
				translateY.value = withSpring(0, { damping: 15, stiffness: 90 });
			} catch (error) {
				console.log(error);
			}
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translateX.value },
				{
					translateY: interpolate(
						translateY.value,
						[-height, 0, height],
						[-height, 0, height],
						Extrapolate.CLAMP
					),
				},
				{
					scale: interpolate(
						translateY.value,
						[-height, 0, height],
						[0.8, 1, 0.8],
						Extrapolate.CLAMP
					),
				},
			],

			opacity: interpolate(
				translateY.value,
				[-height, 0, height],
				[0.96, 1, 0.96],
				Extrapolate.CLAMP
			),

			translateY: withSpring(height * 0.05),

			shadowOffset: {
				width: interpolate(
					translateY.value,
					[-height, 0, height],
					[0, 1, 0],
					Extrapolate.CLAMP
				),
				height: interpolate(
					translateY.value,
					[-height, 0, height],
					[0, 1, 0],
					Extrapolate.CLAMP
				),
			},
			shadowOpacity: interpolate(
				translateY.value,
				[-height, 0, height],
				[0, 0.25, 0],
				Extrapolate.CLAMP
			),
			shadowRadius: interpolate(
				translateY.value,
				[-height, 0, height],
				[0, 4, 0],
				Extrapolate.CLAMP
			),
			elevation: interpolate(
				translateY.value,
				[-height, 0, height],
				[0, 2, 0],
				Extrapolate.CLAMP
			),
			// zIndex: isCardActive.value ? 1 : 0,
			shadowColor: isCardActive.value ? 'rgba(0,0,0,0.025)' : 'tranparent',
			backgroundColor: '#fff',
		};
	});

	return (
		<PanGestureHandler onGestureEvent={gestureHandler}>
			<Animated.View
				style={[
					{
						flex: 1,
						// position: isAndroid ? 'relative' : 'absolute',
						position: 'absolute',
						height: window?.height,
						// position: isAndroid ? 'relative' : 'absolute',
						width: window.width,
						overflow: 'hidden',
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						// borderRadius: 1,
						// backgroundColor: 'pink',

						// display: isCardActive.value ? 'flex' : 'none',
					},
					// animatedStyle,
				]}
			>
				<Animated.View style={[styles.item, animatedStyle]}>
					<Animated.Image
						source={{ uri: img }}
						style={styles.image}
						sharedTransitionTag={id}
						resizeMode={'cover'}
					/>
					<RectButton
						rippleRadius={100}
						style={styles.rectButton}
						onPress={() =>
							navigation.navigate('Profile2', {
								id,
								img,
								name,
								occupation,
								distance,
								city,
								index,
								tag: id,
							})
						}
					></RectButton>
					{!isAndroid ? (
						<BlurView style={styles.blurView} overlayColor="#000">
							<Text style={styles.blurText}>
								{/* {`${id || index}-tinder`} */}
								{distance ?? '1 KM'}
							</Text>
						</BlurView>
					) : (
						<View style={styles.blurView}>
							<Text style={styles.blurText}>{distance ?? '1 KM'}</Text>
						</View>
					)}
					<View style={styles.infoContainer}>
						<View style={styles.infoContent}>
							<Text style={styles.nameText}>{name}</Text>
							<Text style={styles.occupationText}>{occupation}</Text>
							<View style={styles.detailsContainer}>
								<Text style={styles.detailsText}>{city ?? 'Chikago, UN'}</Text>
								<TouchableOpacity style={styles.locationButton}>
									<Text style={styles.locationButtonText}>
										{distance ?? '1km'}
									</Text>
									<Entypo name="location" size={24} color="#F44586" />
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.actionsContainer}>
							<TouchableOpacity
								style={styles.crossButton}
								onPress={() => handleSwipe('left')}
							>
								<Entypo name="cross" size={24} color="#F27121" />
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.heartButton}
								onPress={() => handleSwipe('right')}
							>
								<Entypo name="heart" size={35} color="white" />
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.messageButton}
								onPress={() => navigation.navigate('Messages')}
							>
								<Entypo name="message" size={24} color="#F44586" />
							</TouchableOpacity>
						</View>
					</View>
				</Animated.View>
			</Animated.View>
		</PanGestureHandler>
	);
};

const styles = StyleSheet.create({
	actionsContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 20,
		justifyContent: 'center',
		paddingVertical: 15,
	},
	blurText: {
		color: 'white',
	},
	blurView: {
		borderRadius: 8,
		left: 20,
		paddingHorizontal: 13,
		paddingVertical: 8,
		position: 'absolute',
		top: 20,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
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
	detailsContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	detailsText: {
		...FontSizeColorStyle['inter-400-14-black'],
		color: '#1E1E1E',
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
	image: {
		borderRadius: 10,
		flex: 1,
		height: '100%',
		width: '100%',
	},
	infoContainer: {
		backgroundColor: '#fff',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		paddingVertical: 16,
		width: '100%',
		// marginTop: -5,
		// flex: 1,
	},
	infoContent: {
		gap: 10,
		width: '99%',
	},
	item: {
		borderRadius: 10,
		bottom: (window?.height - cardHeight) / 2,
		height: cardHeight,
		left: (window?.width - cardWidth) / 2,
		// overflow: 'hidden',
		// overflow: isAndroid ? 'hidden' : 'visible',
		// position: 'absolute',
		right: (window?.width - cardWidth) / 2,

		shadowOpacity: 0,
		shadowColor: 'tranparent',
		top: 0,
		// top: (window?.height - cardHeight) / 2,
		width: cardWidth,
		zIndex: 1,
	},
	locationButton: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 8,
		paddingVertical: 6,
	},
	locationButtonText: {
		...FontSizeColorStyle['inter-500-sm-primary'],
		color: '#F44586',
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
	nameText: {
		...FontSizeColorStyle['inter-600-20-black'],
		color: '#1E1E1E',
		// fontFamily: 'Inter',
		// fontSize: 20,
		// fontWeight: '600',
	},
	occupationText: {
		...FontSizeColorStyle['inter-400-14-black'],
		color: '#1E1E1E',

		// fontFamily: 'Inter',
		// fontSize: 14,
		// fontWeight: '400',
	},
	rectButton: {
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderRadius: 10,
		flex: 1,
		overflow: 'hidden',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
});

export default TinderItem;
