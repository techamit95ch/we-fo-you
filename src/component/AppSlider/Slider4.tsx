import { StyleSheet } from 'react-native';
import { Image } from 'react-native-ui-lib';
import { View } from '@base';

import Word from './Word';

import { IMAGES } from '@/assets';
import { screenHeight, screenWidth } from '@/lib/utils';
import { responsive } from '@/styles';

const BOLDS = ['Publish Your', 'Press Release'] as const;

// Publish Your Press Release
const SMALLS = ['Your trusted source of', 'crypto and blockchain', 'knowledge'] as const;

const BOLD_DURATION = BOLDS.length * 300;

const Slider4 = ({ active }: { active?: boolean }) => {
	return (
		<View
			flex
			bg-black
			animate={{
				opacity: active ? 1 : 0.98,
				scale: active ? 1 : 0.98,
			}}
		>
			<Image source={IMAGES.slider3} resizeMode="stretch" style={styles.image} />
			<View flex style={styles.view}>
				{active ? (
					<View>
						{BOLDS.map((text, index) => (
							<Word text={text} index={index} key={index.toString()} />
						))}
					</View>
				) : null}
				{active ? (
					<View>
						{SMALLS.map((text, index) => (
							<Word
								text={text}
								index={index}
								size="small"
								extraDuration={BOLD_DURATION}
								key={index.toString()}
							/>
						))}
					</View>
				) : null}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		height: screenHeight,
		width: screenWidth,
	},
	view: {
		bottom: 0,
		gap: responsive(20),
		height: screenHeight * 0.5,
		padding: responsive(45),
		position: 'absolute',
		// width: screenWidth * 0.8,
	},
});

export default Slider4;
