import type React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import type { IntroScreenProp } from './types';

import { Colors, DIMENSION_HEIGHT, DIMENSION_WIDTH } from '@/styles';

export interface IntroScreenProps {
	content: IntroScreenProp;
	animatedStyle?: ViewStyle;
	active?: boolean;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ content: Content, active, animatedStyle }) => {
	return (
		<Animated.View style={[styles.screen, animatedStyle]}>
			<Content active={active} />
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: DIMENSION_WIDTH,
		...Colors['bg-black'],
		height: DIMENSION_HEIGHT,
	},
});

export default IntroScreen;
