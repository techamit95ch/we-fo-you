import type React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { ActiveDot, BasicDot } from './Dot';
interface DotContainerProps {
	numDots: number;
	dotStyle: ViewStyle;
}

const DotContainer: React.FC<DotContainerProps> = ({ numDots, dotStyle }) => {
	return (
		<View style={styles.container}>
			{new Array(numDots).fill('').map((_, index) => (
				<BasicDot key={index} />
			))}
			<ActiveDot dotStyle={dotStyle} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 6,
		justifyContent: 'center',
	},
});

export default DotContainer;
