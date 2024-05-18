import { StyleSheet, View } from 'react-native';
import { Image } from 'moti';

import Container from './Container';
import Word from './Word';

import { IMAGES } from '@/assets';
import { screenHeight, screenWidth } from '@/lib/utils';
import { responsive } from '@/styles';

const BOLDS = ['Welcome to', 'Crypto Coffee', 'Tales'] as const;

// Your trusted source of crypto and blockchain knowledge.
const SMALLS = ['Your trusted source of', 'crypto and blockchain', 'knowledge'] as const;

const BOLD_DURATION = BOLDS.length * 300;

const Slider2 = ({ active }: { active?: boolean }) => {
	return (
		<Container active={active}>
			<Image source={IMAGES.slider2} resizeMode="stretch" style={styles.image} />
			<View style={styles.view}>
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
		</Container>
	);
};

const styles = StyleSheet.create({
	image: {
		height: screenHeight,
		width: screenWidth,
	},
	view: {
		bottom: 0,
		flex: 1,
		gap: responsive(20),
		height: screenHeight * 0.5,
		padding: responsive(45),
		position: 'absolute',
	},
});

export default Slider2;
