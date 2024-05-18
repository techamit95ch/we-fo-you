import React from 'react';
import type { ImageSourcePropType, ImageURISource, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

interface Props {
	style?: StyleProp<ViewStyle>;
	index?: number;
	showIndex?: boolean;
	img?: ImageSourcePropType;
}

export const SBImageItem: React.FC<Props> = ({ style, index: _index, showIndex = true, img }) => {
	const index = _index ?? 0;

	const source = React.useRef<ImageURISource>({
		uri: `https://picsum.photos/id/${index}/400/300`,
	}).current;

	return (
		<View style={[styles.container]}>
			<Animated.Image
				cachePolicy={'memory-disk'}
				key={index}
				style={styles.image}
				source={img ?? source}
				resizeMode="cover"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: 'transparent',
		borderRadius: 15,
		// flex: 1,
		height: 450,
		justifyContent: 'center',
		overflow: 'hidden',
		width: 293.75,
	},
	image: {
		borderRadius: 15,
		height: '100%',
		position: 'absolute',
		width: '100%',
	},
});
