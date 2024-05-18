import * as React from 'react';
import { Image, ImageSourcePropType, Text, View, ViewStyle } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
	AnimatedStyleProp,
	Extrapolate,
	FadeInDown,
	interpolate,
	useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { Entypo } from '@expo/vector-icons';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/core';

import { window } from '../../constants';

export type TAnimationStyle = (value: number) => AnimatedStyleProp<ViewStyle>;

export type TinderType = {
	img?: ImageSourcePropType;
	name?: string;
	distance?: string;
	city?: string;
	occupation?: string;
	id?: string;
};
export type TinderProps<T> = { data: T[] };

function Tinder<T = TinderType>({ data }: TinderProps<T>) {
	const headerHeight = 100;

	const PAGE_WIDTH = window.width;

	const PAGE_HEIGHT = window.height;

	const directionAnimVal = useSharedValue(0);

	const animationStyle: TAnimationStyle = React.useCallback(
		(value: number) => {
			'worklet';
			const translateY = interpolate(value, [0, 1], [0, -18]);

			const translateX =
				interpolate(value, [-1, 0], [PAGE_WIDTH, 0], Extrapolate.CLAMP) *
				directionAnimVal.value;

			const rotateZ =
				interpolate(value, [-1, 0], [15, 0], Extrapolate.CLAMP) * directionAnimVal.value;

			const zIndex = interpolate(
				value,
				[0, 1, 2, 3, 4],
				[0, 1, 2, 3, 4].map((v) => (data.length - v) * 10),
				Extrapolate.CLAMP
			);

			const scale = interpolate(value, [0, 1], [1, 0.95]);

			const opacity = interpolate(
				value,
				[-1, -0.8, 0, 1],
				[0, 0.9, 1, 0.85],
				Extrapolate.EXTEND
			);

			return {
				transform: [
					{ translateY },
					{ translateX },
					{ rotateZ: `${rotateZ}deg` },
					{ scale },
				],
				zIndex,
				opacity,
			};
		},
		[PAGE_WIDTH, data.length, directionAnimVal.value]
	);

	return (
		<View style={{ flex: 1, position: 'relative', backgroundColor: '#fff' }}>
			<Carousel
				loop={false}
				style={{
					width: PAGE_WIDTH,
					height: PAGE_HEIGHT,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'white',
					position: 'relative',
				}}
				defaultIndex={0}
				vertical={false}
				width={PAGE_WIDTH}
				height={PAGE_HEIGHT}
				data={data}
				onConfigurePanGesture={(g) => {
					g.onChange((e) => {
						directionAnimVal.value = Math.sign(e.translationX);
					});
				}}
				fixedDirection="negative"
				renderItem={({ index, item }) => <Item key={index} {...item} />}
				customAnimation={animationStyle}
				windowSize={5}
			/>
		</View>
	);
}

const Item: React.FC<TinderType> = ({
	img,
	distance,
	name = 'Name',
	occupation = 'Occupation',
	id,
	city,
}) => {
	const width = window.width * 0.8;

	const navigation = useNavigation();

	const height = window.height * 0.5;

	return (
		<Animated.View
			entering={FadeInDown.duration(300)}
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#fff',
				paddingTop: 40,
			}}
		>
			<RectButton
				rippleRadius={100}
				rippleColor={'rgba(0,0,0,0.5)'}
				underlayColor="rgba(0,0,0,0.5)"
				style={{
					width,
					height,
					borderRadius: 20,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'white',

					shadowColor: '#000000d1',
					shadowOffset: {
						width: 0,
						height: 0,
					},
					shadowOpacity: 0.51,
					shadowRadius: 2,
					elevation: 1,
				}}
				onPress={() => {
					navigation.navigate('Profile');
				}}
			>
				<Image
					source={img!}
					style={{
						width,
						height,
						borderRadius: 20,
					}}
				/>
				<BlurView
					style={{
						position: 'absolute',
						paddingHorizontal: 13,
						paddingVertical: 8,
						borderRadius: 8,
						top: 20,
						left: 20,
					}}
				>
					<Text style={{ color: 'white' }}>{distance ?? '1 KM'}</Text>
				</BlurView>
			</RectButton>
			<View
				style={{
					paddingHorizontal: 10,
					paddingTop: 30,
					gap: 10,
					width,
				}}
			>
				<Text
					style={{
						color: ' #1E1E1E',
						fontFamily: 'Inter',
						fontSize: 20,
						fontWeight: '600',
					}}
				>
					{name}
				</Text>
				<Text
					style={{
						color: ' #1E1E1E',
						fontFamily: 'Inter',
						fontSize: 14,
						fontWeight: '400',
					}}
				>
					{occupation}
				</Text>
				<View
					style={{
						width: '100%',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Text
						style={{
							color: ' #1E1E1E',
							fontFamily: 'Inter',
							fontSize: 14,
							fontWeight: '400',
						}}
					>
						{city ?? 'Chikago, UN'}
					</Text>
					<TouchableOpacity
						style={{
							paddingHorizontal: 8,
							paddingVertical: 6,
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Text
							style={{
								color: ' #F44586',
								fontFamily: 'Inter',
								fontSize: 11,
								fontWeight: '500',
							}}
						>
							{distance ?? '1km'}
						</Text>
						<Entypo name="location" size={24} color="#F44586" />
					</TouchableOpacity>
				</View>
			</View>
			<View
				style={{
					paddingTop: 30,
					paddingBottom: 50,
					gap: 20,
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<TouchableOpacity
					style={{
						backgroundColor: 'white',
						borderRadius: 100,
						padding: 10,
						shadowColor: 'red',
						shadowOffset: {
							width: 0,
							height: 0,
						},
						shadowOpacity: 0.51,
						shadowRadius: 2,
						elevation: 2,
					}}
				>
					<Entypo name="cross" size={24} color="#F27121" />
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						backgroundColor: '#F44586',
						borderRadius: 100,
						padding: 13,
						shadowColor: '#F44586',
						shadowOffset: {
							width: 0,
							height: 0,
						},
						shadowOpacity: 0.51,
						shadowRadius: 5,
						elevation: 5,
					}}
				>
					<Entypo name="heart" size={35} color="white" />
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						backgroundColor: 'white',
						borderRadius: 100,
						padding: 10,
						shadowColor: '#F44586',
						shadowOffset: {
							width: 0,
							height: 0,
						},
						shadowOpacity: 0.51,
						shadowRadius: 2,
						elevation: 2,
					}}
				>
					<Entypo name="message" size={24} color="#F44586" />
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
};

export default Tinder;
