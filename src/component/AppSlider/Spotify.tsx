import { StyleSheet } from 'react-native';
import { Image } from 'react-native-ui-lib';
import { AnimatePresence, MotiView } from 'moti';

import { IMAGES } from '@/assets';
import { screenHeight, screenWidth } from '@/lib/utils';
import { responsive } from '@/styles';

const SPOTIFY_FROM = {
	opacity: 0.9,
	right: responsive(40),
	translateY: -150,
} as const;

const SPOTIFY_TO = {
	opacity: 1,
	right: responsive(40),
	translateY: screenHeight * 0.4,
} as const;

const BALL_FROM = {
	translateX: -screenWidth,
} as const;

const BALL_FROM2 = {
	translateX: -(screenWidth + screenWidth),
} as const;

const BALL_TO = {
	translateX: screenWidth - screenWidth,
} as const;

function SpotifyShape({ reverse }: { reverse?: boolean }) {
	return (
		<MotiView
			from={reverse ? SPOTIFY_TO : SPOTIFY_FROM}
			animate={reverse ? SPOTIFY_FROM : SPOTIFY_TO}
			exit={{
				right: responsive(40),
				scale: 0.4,
				translateY: screenHeight,
			}}
			delay={750}
			transition={{
				damping: 6,
				mass: 0.6,
				stiffness: reverse ? 100 : 200,
				type: 'spring',
			}}
			style={styles.shape}
		>
			<Image source={IMAGES.spotify} resizeMode="stretch" style={styles.shopify} />
		</MotiView>
	);
}

function BallShape({ reverse }: { reverse?: boolean }) {
	return (
		<>
			<MotiView
				from={reverse ? BALL_TO : BALL_FROM}
				animate={reverse ? BALL_FROM2 : BALL_TO}
				exit={{
					scale: 0.9,
					translateX: screenWidth,
				}}
				transition={{
					delay: 0,
					duration: 750,
					type: 'timing',
				}}
				style={styles.ballshape}
			>
				<Image source={IMAGES.sliderBall} resizeMode="stretch" style={styles.ball} />
			</MotiView>
		</>
	);
}

export const Spotify = ({
	page,
	val,
}: {
	page: 2 | 3 | 4;
	val: {
		spotify: number;
		ball: number;
	};
}) => (
	<>
		{page > 2 ? (
			<AnimatePresence exitBeforeEnter>
				<MotiView style={styles.container}>
					<SpotifyShape reverse={val.spotify === 2 && page === 3} />
				</MotiView>
			</AnimatePresence>
		) : null}
		{page !== 4 ? (
			<AnimatePresence exitBeforeEnter>
				<MotiView style={styles.containerBall}>
					<BallShape reverse={page === 3} />
				</MotiView>
			</AnimatePresence>
		) : null}
	</>
);

const styles = StyleSheet.create({
	ball: {
		height: responsive(600),
		width: responsive(600),
		zIndex: 1,
	},

	ballshape: {
		borderRadius: responsive(25),
		height: responsive(600),
		justifyContent: 'center',
		width: responsive(600),
	},
	container: {
		alignItems: 'center',
		// backgroundColor: 'white',
		flex: 1,
		flexDirection: 'column',
		height: screenHeight,
		marginLeft: screenWidth * 0.7,
		position: 'absolute',
	},
	containerBall: {
		bottom: 10,
		flex: 1,
		flexDirection: 'column',
		height: screenHeight,
		left: screenWidth * 0.17,
		paddingTop: responsive(50),
		position: 'absolute',
	},
	shape: {
		borderRadius: responsive(25),
		height: responsive(153),
		justifyContent: 'center',
		left: -responsive(40),
		position: 'absolute',
		width: responsive(153),
	},
	shopify: {
		height: responsive(153),
		width: responsive(153),
		zIndex: 1,
	},
});

export default Spotify;
