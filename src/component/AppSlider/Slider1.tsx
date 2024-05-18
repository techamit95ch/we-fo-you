import { Image, StyleSheet, Text, View } from 'react-native';
import { MotiView } from 'moti';

import { SliderLoaderLottie } from '../Common';

import type { SlidersProps } from './types';

import { IMAGES } from '@/assets';
import { windowHeight, windowWidth } from '@/lib/utils';
import { Colors } from '@/styles';
import { FontSizeWithColors, FontWithColors, responsive } from '@/styles/fonts';

const BOLDS = ['GOOD', 'COMMUNITY', 'STARTS', 'WITH YOU'] as const;

const SMALLS = ['Revolutionizing', 'Blockchain and Crypto', 'Industry'] as const;

// const BOLD_DURATION = BOLDS.length * 300;

const Word = ({
	text,
	// index = 0,
	size = 'bold',
}: {
	text: string;
	index?: number;
	size?: 'bold' | 'small';
}) => (
	<Text
		style={size === 'bold' ? styles.textBold : styles.textSmall}
		// animate={{
		// 	opacity: 1,
		// 	scale: 1,
		// }}
		// from={{
		// 	opacity: 0,
		// 	scale: 0.9,
		// }}
		// transition={{
		// 	delay: (size === 'small' ? BOLD_DURATION : 0) + index * (size === 'small' ? 200 : 300),
		// 	duration: size === 'small' ? 200 : 300,
		// 	type: 'timing',
		// }}
	>
		{text}
	</Text>
);

const Splash1 = ({}: SlidersProps) => {
	return (
		<>
			<Image source={IMAGES.slider1} style={styles.image} resizeMode="stretch" />
			<View style={styles.lotti}>
				<SliderLoaderLottie />
			</View>

			<MotiView
				style={styles.layout}
				transition={{
					delay: 100,
					duration: 200,
					type: 'timing',
				}}
				animate={{
					opacity: 1,
				}}
				from={{
					opacity: 0,
				}}
			>
				<Image source={IMAGES.icon} style={styles.icon} resizeMode="contain" />

				{BOLDS.map((text, index) => (
					<Word text={text} index={index} key={index.toString()} />
				))}

				<View style={styles.smallContainer}>
					{SMALLS.map((text, index) => (
						<Word text={text} index={index} size="small" key={index.toString()} />
					))}
				</View>
			</MotiView>
		</>
	);
};

export default Splash1;

const styles = StyleSheet.create({
	button: {
		gap: 8,
	},
	buttonContainer: {
		bottom: responsive(50),
		flex: 1,
		flexDirection: 'row',

		gap: 8,
		paddingHorizontal: responsive(40),
		position: 'absolute',
		width: '100%',
	},
	container: {
		flex: 1,
		...Colors['bg-black'],
		height: windowHeight,
		width: windowWidth,
	},
	icon: {
		borderRadius: responsive(9),
		height: responsive(76),
		marginBottom: responsive(60),
		position: 'relative',
		width: responsive(59),
	},
	image: {
		height: windowHeight,
		opacity: 0.6,
		width: windowWidth,
	},
	image2: {
		marginLeft: 'auto',
		marginTop: responsive(10),
	},
	image2Container: {
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		height: 'auto',
		justifyContent: 'space-between',
		opacity: 1,
		paddingLeft: responsive(40),
		paddingTop: responsive(50),
		position: 'relative',
	},
	layout: {
		bottom: responsive(120),
		flex: 1,
		paddingBottom: responsive(40),
		paddingLeft: responsive(40),
		position: 'absolute',
		width: '60%',
	},
	lotti: {
		flex: 1,
		height: responsive(350),
		position: 'absolute',
		right: -responsive(100),
		top: responsive(60),
		width: responsive(350),
	},

	overlay: {
		bottom: 0,
		flex: 1,
		left: 0,
		// backgroundColor: 'rgba(27, 27, 27, 0.7)',
		opacity: 1,
		position: 'absolute',
		right: 0,
		top: 0,
	},
	smallContainer: {
		gap: 10,
		marginVertical: responsive(38),
	},
	textBold: {
		fontSize: responsive(32),
		...FontWithColors['opensans-700-white'],
	},
	textBold1: {
		...FontWithColors['opensans-700-white'],
	},
	textBold2: {
		...FontWithColors['opensans-700-white'],
	},
	textSmall: {
		...FontSizeWithColors['roboto-400-18-white'],
	},
} as const);
