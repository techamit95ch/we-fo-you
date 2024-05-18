import type React from 'react';
import type { ViewProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { MotiView } from 'moti';

import { screenWidth, windowHeight } from '@/lib/utils';
import { Colors } from '@/styles';

const Container: React.FC<{
	active?: boolean;
	children: ViewProps['children'];
}> = ({ active, children }) => {
	return (
		<MotiView
			style={styles.container}
			animate={{
				opacity: active ? 1 : 0.98,
				scale: active ? 1 : 0.98,
			}}
			delay={0}
			transition={{
				delay: 0,
				duration: 200,
				type: 'timing',
			}}
		>
			{children}
		</MotiView>
	);
};

export default Container;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		...Colors['bg-black'],
		height: windowHeight,
		width: screenWidth,
	},
});
