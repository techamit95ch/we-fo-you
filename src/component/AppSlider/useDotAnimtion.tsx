import { useEffect } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { DOT_SIZE } from '@/constants/env';

export const useDotAnimtion = (currentIndex: number) => {
	const translateX = useSharedValue(0);

	useEffect(() => {
		translateX.value = withTiming((DOT_SIZE + (currentIndex === 0 ? 0 : 6)) * currentIndex, {
			duration: 500,
			easing: Easing.inOut(Easing.ease),
		});
	}, [currentIndex, translateX]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
			backgroundColor: '#4CAF50',
		};
	});

	return animatedStyle;
};
