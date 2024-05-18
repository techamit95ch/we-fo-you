import type React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import ActionContainer from './ActionContainer';
import IntroScreen from './IntroScreen';
import type { AppIntroSliderProps } from './types';
import useOnBoardScreen from './useOnBoardScreen';

const AppIntroSlider: React.FC<AppIntroSliderProps> = ({ introScreens }) => {
	const {
		handleDone,
		handleSkip,
		sliderStyle,
		handleNext,
		onScroll,
		dotStyle,
		scrollViewRef,
		currentIndex,
	} = useOnBoardScreen(introScreens);

	return (
		<View style={styles.container}>
			<Animated.FlatList
				ref={(ref) => (scrollViewRef.current = ref)}
				horizontal
				pagingEnabled
				onScroll={onScroll}
				scrollEventThrottle={16}
				showsHorizontalScrollIndicator={false}
				data={introScreens}
				renderItem={({ item, index }) => (
					<IntroScreen
						content={item}
						animatedStyle={sliderStyle}
						active={currentIndex === index}
					/>
				)}
				keyExtractor={(_, index) => index?.toString()}
			/>
			{/* <ScrollView
				ref={(ref) => (scrollViewRef.current = ref)}
				horizontal
				pagingEnabled
				onScroll={onScroll}
				scrollEventThrottle={16}
				showsHorizontalScrollIndicator={false}
			>
				{introScreens.map((item, index) => {
					return (
						<IntroScreen
							key={index}
							content={item}
							animatedStyle={sliderStyle}
							active={currentIndex === index}
						/>
					);
				})}
			</ScrollView> */}

			<ActionContainer
				currentIndex={currentIndex}
				introScreensLength={introScreens.length}
				handleNext={handleNext}
				handleSkip={handleSkip}
				dotStyle={dotStyle}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default AppIntroSlider;
