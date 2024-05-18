// import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Constants } from 'react-native-ui-lib';
import { ResizeMode, Video } from 'expo-av';

// import { Image } from 'moti';
import Container from './Container';
import Word from './Word';

import { VIDEOS } from '@/assets';
// import { IMAGES, VIDEOS } from '@/assets';
import { screenHeight, screenWidth } from '@/lib/utils';
import { responsive } from '@/styles';

const BOLDS = ['Share Your Story', 'on Our Blog'] as const;

// Share Your Story on Our Blog
const SMALLS = ['Your trusted source of', 'crypto and blockchain', 'knowledge'] as const;

const BOLD_DURATION = BOLDS.length * 300;

const Slider5 = ({ active }: { active?: boolean }) => {
	return (
		<Container active={active}>
			{/* <Image source={IMAGES.slider5} resizeMode="stretch" style={styles.image} /> */}
			<Video
				style={styles.image}
				source={VIDEOS.slider5}
				useNativeControls={false}
				resizeMode={ResizeMode.STRETCH}
				isLooping
				shouldPlay
				// onPlaybackStatusUpdate={(status) => setStatus(() => status)}
			/>
			{active ? (
				<>
					<View style={styles.view}>
						<View>
							{BOLDS.map((text, index) => (
								<Word text={text} index={index} key={index.toString()} />
							))}
						</View>

						<View>
							{SMALLS.map((text, index) => (
								<Word
									text={text}
									index={index}
									size="small"
									extraDuration={BOLD_DURATION}
								/>
							))}
						</View>
					</View>
				</>
			) : null}
		</Container>
	);
};

const styles = StyleSheet.create({
	image: {
		height: screenHeight * 0.57,
		marginTop: Constants.statusBarHeight,
		width: screenWidth,
	},
	view: {
		bottom: 0,
		flex: 1,
		gap: responsive(20),
		height: screenHeight * 0.43,
		padding: responsive(45),
		position: 'absolute',
	},
});

export default Slider5;
