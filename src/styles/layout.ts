import type { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from './colors';

// import { isAndroid } from '@/lib/utils';

const height = Dimensions.get('window').height;

const width = Dimensions.get('window').width;

export const Layouts = {
	absoluteDarkFill: {
		flex: 1,
		height,
		width,
		...StyleSheet.absoluteFillObject,
		...Colors['bg-black'],
	},
	absoluteFill: {
		flex: 1,
		height,
		width,
		...StyleSheet.absoluteFillObject,
	},
	absoluteWhiteFill: {
		flex: 1,
		height,
		width,
		...StyleSheet.absoluteFillObject,
		...Colors['bg-white'],
	},
	between: {
		alignItems: 'center',
		display: 'flex',
		gap: 10,
		justifyContent: 'space-between',
	},
	center: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		position: 'relative',
	},
	centerV: {
		alignItems: 'center',
		display: 'flex',
		position: 'relative',
	},
	centerH: {
		justifyContent: 'center',
		display: 'flex',
		position: 'relative',
	},
	fill: {
		flex: 1,
	},
	fillBlack: {
		flex: 1,
		...Colors['bg-black'],
	},
	fillWhite: {
		flex: 1,
		...Colors['bg-white'],
	},
	screenLayout: {
		backgroundColor: '#f7f7f7',
		display: 'flex',
		gap: 15,
		padding: 15,
		position: 'relative',

		...(true && {
			paddingBottom: 40,
		}),
	},
	rowGrow: { flexDirection: 'row', flexGrow: 1 },
	row: { flexDirection: 'row' },
} as const satisfies Record<string, StyleProp<ViewStyle & ImageStyle>>;

export const LayoutStyle = StyleSheet.create(Layouts);
