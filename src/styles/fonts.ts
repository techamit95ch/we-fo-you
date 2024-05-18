import { RFValue } from 'react-native-responsive-fontsize';

import { ALL_COLORS } from './colors';
import type {
	FontColorType,
	FontSizeColorType,
	FontSizeColorTypeTextType,
	FontType,
} from './types';

export const idealIOSHeight = 940 as const;

export const responsive = <T extends number>(font: T) => RFValue(font, idealIOSHeight) as T;

export const All_FONT_SIZES = {
	'12': 12,
	'13': 13,
	'14': 14,
	'15': 15,
	'16': 16,
	'17': 17,
	'18': 18,
	'20': 20,
	'36': 36,
	lg: 22,
	md: 16,
	sm: 11,
	xl: 24,
	xs: 10,
	xxl: 32,
	xxs: 9,
	xxxs: 7,
} as const;

export const WEIGHT_LITERALS = {
	100: 'Thin',
	200: 'ExtraLight',
	300: 'Light',
	400: 'Regular',
	500: 'Medium',
	600: 'SemiBold',
	700: 'Bold',
	800: 'ExtraBold',
	900: 'Black',
} as const;

export const FONT_LITERALS = {
	inter: 'Inter',
	// opensans: 'Poppins',
	roboto: 'Roboto',
	opensans: 'Opensans',
} as const;

// @ts-ignore
export const Fonts: FontType = Object.entries(FONT_LITERALS).reduce((acc, [key, value]) => {
	const array = Object.entries(WEIGHT_LITERALS).reduce(
		(ac2, [key2, value2]) => ({
			...ac2,
			[`${key.toLowerCase()}-${key2.toLowerCase()}`]: {
				fontFamily: `${value}-${value2}` as const,
			},
		}),
		{}
	);

	return {
		...acc,
		...array,
	};
}, {});

// @ts-ignore
export const FontWithColors: FontColorType = Object.entries(FONT_LITERALS).reduce(
	(acc, [key, value]) => {
		const array = Object.entries(WEIGHT_LITERALS).reduce((ac2, [key2, value2]) => {
			const array2 = Object.entries(ALL_COLORS).reduce((ac3, [key3, value3]) => {
				return {
					...ac3,
					[`${key.toLowerCase()}-${key2.toLowerCase()}-${key3.toLowerCase()}`]: {
						color: `${value3.toLowerCase()}`,
						fontFamily: `${value}-${value2}` as const,
						fontStyle: 'normal',
					},
				};
			}, {});

			return {
				...ac2,
				...array2,
			};
		}, {});

		return {
			...acc,
			...array,
		};
	},
	{}
);

// @ts-ignore
export const FontSizeWithColors: FontSizeColorType = Object.entries(FONT_LITERALS).reduce(
	(acc, [key, value]) => {
		const array = Object.entries(WEIGHT_LITERALS).reduce((ac2, [key2, value2]) => {
			const array2 = Object.entries(ALL_COLORS).reduce((ac3, [key3, value3]) => {
				const array3 = Object.entries(All_FONT_SIZES).reduce((ac4, [key4, value4]) => {
					return {
						...ac4,
						[`${key.toLowerCase()}-${key2.toLowerCase()}-${key4}-${key3.toLowerCase()}`]:
							{
								color: `${value3.toLowerCase()}`,
								fontFamily: `${value}-${value2}` as const,
								fontSize: responsive(value4),
								fontStyle: 'normal',
							} as const,
					} as const;
				}, {});

				return {
					...ac3,
					...array3,
				} as const;
			}, {});

			return {
				...ac2,
				...array2,
			};
		}, {});

		return {
			...acc,
			...array,
		};
	},
	{}
);

export const PoppinsFontsItalic = {
	'opensans-italic-900': 'Poppins-BlackItalic',
} as const;

// @ts-ignore
export const FontSizeWithColorsTextManager: FontSizeColorTypeTextType = Object.entries(
	FONT_LITERALS
).reduce((acc, [key]) => {
	const array = Object.entries(WEIGHT_LITERALS).reduce((ac2, [key2]) => {
		const array2 = Object.entries(ALL_COLORS).reduce((ac3, [key3]) => {
			const array3 = Object.entries(All_FONT_SIZES).reduce((ac4, [key4]) => {
				return {
					...ac4,
					[`${key.toLowerCase()}-${key2.toLowerCase()}-${key4}-${key3.toLowerCase()}`]:
						true,
				} as const;
			}, {});

			return {
				...ac3,
				...array3,
			} as const;
		}, {});

		return {
			...ac2,
			...array2,
		};
	}, {});

	return {
		...acc,
		...array,
	};
}, {});
