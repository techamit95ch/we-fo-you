import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import { Colors } from './colors';
import { Fonts, FontSizeWithColors } from './fonts';

export const BUTTON_NAMES = [
	'primary',
	'primary-auth',
	'secondary',
	'secondary-auth',
	'base',
	'chip',
	'selected-chip',
] as const;

export type BUTTON_NAMES_TYPES = (typeof BUTTON_NAMES)[number];

const BUTTON_BORDER_RADIUS = 7 as const;

const BASIC_BUTTON = {
	alignItems: 'center',
	borderRadius: BUTTON_BORDER_RADIUS,
	borderStyle: 'solid',
	display: 'flex',
	flexDirection: 'row',
	paddingHorizontal: 28,
	paddingVertical: 16,
} as const satisfies StyleProp<ViewStyle>;

const primaryButton = {
	...BASIC_BUTTON,
	...Colors['bg-green-2dbc6f'],
} as const satisfies StyleProp<ViewStyle>;

const secondaryButton = {
	...BASIC_BUTTON,
	backgroundColor: '#ededed',
	...Colors['border-green-25ff89'],
} as const satisfies StyleProp<ViewStyle>;

const BUTTON_TEXT = {
	alignItems: 'center',
	...Fonts['opensans-400'],
	fontSize: 14,
	gap: 8,
	justifyContent: 'center',
} as const satisfies StyleProp<TextStyle>;

export const Buttons = {
	base: {
		alignItems: 'center',
	},
	chip: {
		...Colors['border-green'],
		borderRadius: 6,
		borderStyle: 'solid',
		borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: 12,
		paddingVertical: 7,
	},
	primary: {
		...FontSizeWithColors['roboto-400-18-white'],
		...primaryButton,
	},
	'primary-auth': {
		...primaryButton,
		...FontSizeWithColors['opensans-400-20-black'],
	},
	secondary: {
		...Fonts['opensans-600'],
		...secondaryButton,
	},
	'secondary-auth': {
		...FontSizeWithColors['opensans-400-20-white'],
		...secondaryButton,
	},
	'selected-chip': {
		...Colors['bg-green'],
		...Colors['border-green'],
		...Colors['text-white'],
	},
} as const satisfies Record<BUTTON_NAMES_TYPES, StyleProp<ViewStyle>>;

export const ButtonTexts = {
	base: {
		...BUTTON_TEXT,
	},
	chip: {
		...FontSizeWithColors['opensans-500-12-green'],
	},
	primary: {
		...BUTTON_TEXT,
		...FontSizeWithColors['roboto-400-18-white'],
	},
	'primary-auth': {
		...FontSizeWithColors['roboto-400-18-black'],
	},
	secondary: {
		...BUTTON_TEXT,
		...Colors['text-dark-717171'],
	},
	'secondary-auth': FontSizeWithColors['roboto-400-18-white'],
	'selected-chip': {
		...FontSizeWithColors['opensans-500-12-white'],
	},
} as const satisfies Record<BUTTON_NAMES_TYPES, StyleProp<TextStyle>>;

export const ButtonStyle = StyleSheet.create(Buttons);

export const ButtonTextStyle = StyleSheet.create(ButtonTexts);
