import type { ColorsType } from './types';

export const COLOR_PARAMS = {
	bg: 'backgroundColor',
	border: 'borderColor',
	shadow: 'shadowColor',
	text: 'color',
} as const;

export const LIGHT_COLORS = {
	'light-b4b4b4': '#b4b4b4',
	'light-c4c4c4': '#c4c4c4',
	'light-cbcbcb': '#CBCBCB',
	'light-d1c8eb': '#D1C8EB',
	'light-e0e0e0': '#E0E0E0',
	'light-e3e3e3': '#E3E3E3',
	'light-e7e7e7': '#E7E7E7',
	'light-ebebeb': '#EBEBEB',
	'light-f5f5f5': '#F5F5F5',
	'light-f7f7f7': '#f7f7f7',
	'light-f8f8f8': '#F8F8F8',
	'light-fafafa': '#FAFAFA',
	'light-fbf6ef': '#FBF6EF',
	'light-ffd9cc': '#ffd9cc',
	'light-google': '#EDEDED',
	white: '#ffffff',
} as const;

export const GREY_COLORS = {
	'grey-535353': '#535353',
	'grey-616161': '#616161',
	'grey-6b6b6b': '#6B6B6B',
	'grey-6c6c6c': '#6C6C6C',
	'grey-797979': '#797979',
	'grey-858585': '#858585',
	'grey-868686': '#868686',
	'grey-8e8e8e': '#8E8E8E',
	'grey-a7a7a7': '#A7A7A7',
	'grey-b6b6b6': '#B6B6B6',
} as const;

export const DARK_COLORS = {
	black: '#000000',
	'dark-1e1e1e': '#1E1E1E',
	'dark-232323': '#232323',
	'dark-303030': '#303030',
	'dark-313131': '#313131',
	'dark-343434': '#343434',
	'dark-414141': '#414141',
	'dark-494949': '#494949',
	'dark-4a4a4a': '#4A4A4A',
	'dark-505050': '#505050',
	'dark-595959': '#595959',
	'dark-717171': '#717171',
} as const;

export const GREEN_COLORS = {
	green: '#00A34B',
	'green-00deab': '#00DEAB',
	'green-00fff0': '#00FFF0',
	'green-25ff89': '#25FF89',
	'green-2dbc6f': '#2DBC6F',
	'green-95ddb6': '#95DDB6',
	'green-9aebbf': '#9AEBBF',
} as const;

export const ALL_COLORS = {
	...LIGHT_COLORS,
	...GREY_COLORS,
	...DARK_COLORS,
	...GREEN_COLORS,
	error: '#dc143c',
	facebook: '#3b5998',
	transparent: 'transparent',
	warning: '#ff7b00',
	primary: '#F44586',
} as const;

export type UiLibColorsType = {
	[key in keyof typeof ALL_COLORS]: `${Lowercase<(typeof ALL_COLORS)[key]>}`;
};

// @ts-ignore
export const UiLibColors: UiLibColorsType = Object.entries(ALL_COLORS).reduce(
	(acc, [key, value]) => ({
		...acc,
		[key]: `${value}`,
	}),
	{}
);

// @ts-ignore
const Colors1: ColorsType = Object.entries(ALL_COLORS).reduce((acc, [key, value]) => {
	const array = Object.entries(COLOR_PARAMS).reduce(
		(ac2, [key2, value2]) => ({
			...ac2,
			[`${key2.toLowerCase()}-${key.toLowerCase()}`]: {
				[value2]: `${value}`,
			},
		}),
		{}
	);

	return {
		...acc,
		...array,
	};
}, {});

export const ShadowRBGAColors = {
	'bg-rgba(27, 27, 27, 0.7)': {
		backgroundColor: 'rgba(27, 27, 27, 0.7)',
	},
	'bg-tranparent': {
		backgroundColor: 'tranparent',
	},
	'shadow-rgba(0, 0, 0, 0.02)': {
		shadowColor: 'rgba(0, 0, 0, 0.25)',
	},
	'shadow-rgba(0, 0, 0, 0.05)': {
		shadowColor: 'rgba(0, 0, 0, 0.5)',
	},
	'shadow-rgba(0, 0, 0, 0.1)': {
		shadowColor: 'rgba(0, 0, 0, 1)',
	},
	'shadow-rgba(201, 201, 201, 0.1)': {
		shadowColor: 'rgba(201, 201, 201, 0.1)',
	},
} as const;

export const Colors: ColorsType = {
	...Colors1,
	...ShadowRBGAColors,
};
