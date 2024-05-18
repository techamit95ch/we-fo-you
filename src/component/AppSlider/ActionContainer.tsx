import type React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import DotContainer from './DotsContainer';
import NextButton from './NextButton';

interface ActionContainerProps {
	currentIndex: number;
	introScreensLength: number;
	handleNext: () => void;
	handleSkip: () => void;
	dotStyle: ViewStyle;
}

const ActionContainer: React.FC<ActionContainerProps> = ({
	currentIndex,
	introScreensLength,
	handleNext,
	handleSkip,
	dotStyle,
}) => {
	return (
		<View style={styles.actionContainer}>
			{currentIndex > 0 && currentIndex < introScreensLength - 1 ? (
				<NextButton onPress={handleSkip} text="Skip" icon="skip" />
			) : (
				<View style={{ width: 100 }} />
			)}

			<View style={styles.dotContainer}>
				<DotContainer numDots={introScreensLength} dotStyle={dotStyle} />
			</View>
			<NextButton
				onPress={handleNext}
				text={
					currentIndex === 0
						? 'Scroll to learn more'
						: currentIndex < introScreensLength - 1
						? 'Next'
						: 'Done'
				}
				icon={
					currentIndex === 0
						? 'start'
						: currentIndex < introScreensLength - 1
						? 'next'
						: 'done'
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	actionContainer: {
		alignItems: 'center',
		bottom: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		left: 0,
		paddingHorizontal: 40,
		paddingVertical: 20,
		position: 'absolute',
		right: 0,
	},
	dotContainer: {
		alignItems: 'center',
		flex: 1,
	},
	nextButton: {
		alignItems: 'flex-end',
	},
	skipButton: {
		alignItems: 'flex-start',
	},
});

export default ActionContainer;
