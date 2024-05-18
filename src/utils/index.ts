import { Platform } from 'react-native';
import { SharedTransition, withTiming } from 'react-native-reanimated';

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';


export const customTransition = SharedTransition.custom((values) => {
	'worklet';

	return {
		height: withTiming(values.targetHeight),
		width: withTiming(values.targetWidth),
		originX: withTiming(values.targetOriginX),
		originY: withTiming(values.targetOriginY),
	};
});

export * from './error';
export * from './toast';
