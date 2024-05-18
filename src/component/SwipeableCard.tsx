// SwipeableCard.tsx
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface SwipeableCardProps {
	index: number;
	onSwipeLeft: (index: number) => void;
	onSwipeRight: (index: number) => void;
	style?: StyleProp<ViewStyle>;
}

const SWIPE_THRESHOLD = 120;

const SwipeableCard: React.FC<SwipeableCardProps> = ({
	index,
	onSwipeLeft,
	onSwipeRight,
	style,
}) => {
	const translationX = useSharedValue(0);

	const onGestureEvent = useAnimatedGestureHandler({
		onActive: (event) => {
			translationX.value = event.translationX;
		},
		onEnd: (event) => {
			if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
				if (event.translationX > 0) {
					onSwipeRight(index);
				} else {
					onSwipeLeft(index);
				}
			} else {
				translationX.value = withSpring(0);
			}
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translationX.value }],
		};
	});

	return (
		<View style={[styles.cardContainer, style]}>
			<PanGestureHandler
				onGestureEvent={onGestureEvent}
				onHandlerStateChange={onGestureEvent}
			>
				<Animated.View style={[styles.card, animatedStyle]} />
			</PanGestureHandler>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: 'lightblue',
		borderRadius: 10,
		elevation: 5,
		height: 400,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		width: 300,
	},
	cardContainer: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
});

export default SwipeableCard;
