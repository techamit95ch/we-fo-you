import React from 'react';
import {
	type ImageSourcePropType,
	type StyleProp,
	Text,
	type ViewProps,
	type ViewStyle,
} from 'react-native';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import type { AnimateProps, SharedValue } from 'react-native-reanimated';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Constants from 'expo-constants';

import { SBImageItem } from './SBImageItem';
import { SBTextItem } from './SBTextItem';

interface Props extends AnimateProps<ViewProps> {
	style?: StyleProp<ViewStyle>;
	index?: number;
	pretty?: boolean;
	showIndex?: boolean;
	img?: ImageSourcePropType;
	headLine?: string;
	subHead?: string;
	progressValue: SharedValue<number>;
}

export const SBItem: React.FC<Props> = ({
	style,
	index = 0,
	pretty,
	img,
	testID,
	headLine = 'Algorithm',
	subHead = 'Users going through a vetting process to ensure you never match with bots.',
	progressValue,
	...animatedViewProps
}) => {
	const enablePretty = Constants?.expoConfig?.extra?.enablePretty || false;

	const [isPretty, setIsPretty] = React.useState(pretty || enablePretty);

	const footstyle = useAnimatedStyle(() => {
		'worklet';
		const opacity = interpolate(
			Math.floor(progressValue?.value),
			[index - 1, index, index + 1],
			[0, 1, 0],
			Extrapolate.CLAMP
		);

		return {
			opacity,
			// zIndex: isVisible ? 1 : 0,
		};
	});

	return (
		<LongPressGestureHandler
			onActivated={() => {
				setIsPretty(!isPretty);
			}}
		>
			<Animated.View
				testID={testID}
				style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				{...animatedViewProps}
			>
				{isPretty || img ? (
					<SBImageItem style={style} index={index} showIndex={false} img={img} />
				) : (
					<SBTextItem style={style} index={index} />
				)}
				<Animated.View
					style={{
						display: 'flex',
						padding: 40,
						paddingBottom: 20,
						height: 126,
						width: 368.75,
					}}
				>
					<Animated.View
						style={[
							{
								flex: 1,
								zIndex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								gap: 10,
							},
							footstyle,
						]}
					>
						<Text
							style={{
								fontFamily: 'Opensans-Bold',
								fontSize: 32,
								lineHeight: 36,
								color: '#F44586',
								textAlign: 'center',
							}}
						>
							{headLine}
						</Text>
						<Text
							style={{
								fontFamily: 'Opensans-Regular',
								fontSize: 18,
								lineHeight: 21,
								color: '#323755',
								textAlign: 'center',
							}}
						>
							{subHead}
						</Text>
					</Animated.View>
				</Animated.View>
			</Animated.View>
		</LongPressGestureHandler>
	);
};
