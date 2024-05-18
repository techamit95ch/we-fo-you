import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from './colors';
import { Fonts, FontSizeWithColors, FontWithColors } from './fonts';
import type { ColorsType, FontColorType, FontSizeColorType, FontType } from './types';

export type StyleType = TextStyle & ViewStyle & ImageStyle;

export const ColorStyle = StyleSheet.create<ColorsType>(Colors);
export const FontStyle = StyleSheet.create<FontType>(Fonts);
export const FontColorStyle = StyleSheet.create<FontColorType>(FontWithColors);

export const FontSizeColorStyle = StyleSheet.create<FontSizeColorType>(FontSizeWithColors);

export const PRIMARY_COLOR = '#7444C0' as const;
export const SECONDARY_COLOR = '#5636B8' as const;
export const WHITE = '#FFFFFF' as const;
export const GRAY = '#757E90' as const;
export const DARK_GRAY = '#363636' as const;
export const BLACK = '#000000' as const;

export const ONLINE_STATUS = '#46A575' as const;
export const OFFLINE_STATUS = '#D04949' as const;

export const STAR_ACTIONS = '#FFA200' as const;
export const LIKE_ACTIONS = '#B644B2' as const;
export const DISLIKE_ACTIONS = '#363636' as const;
export const FLASH_ACTIONS = '#5028D7' as const;

export const DIMENSION_WIDTH = Dimensions.get('window').width;
export const DIMENSION_HEIGHT = Dimensions.get('window').height;

const ALL_STYLES = StyleSheet.create({
	containerCardItem: {
		alignItems: 'center',
		backgroundColor: WHITE,
		borderRadius: 8,
		elevation: 1,
		margin: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 },
		shadowOpacity: 0.05,
		shadowRadius: 10,
	},
	matchesCardItem: {
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 20,
		marginTop: -35,
		paddingHorizontal: 20,
		paddingVertical: 7,
	},
	matchesTextCardItem: {
		color: WHITE,
	},
	descriptionCardItem: {
		color: GRAY,
		textAlign: 'center',
	},
	status: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingBottom: 10,
	},
	statusText: {
		color: GRAY,
		fontSize: 12,
	},
	online: {
		backgroundColor: ONLINE_STATUS,
		borderRadius: 3,
		height: 6,
		marginRight: 4,
		width: 6,
	},
	offline: {
		backgroundColor: OFFLINE_STATUS,
		borderRadius: 3,
		height: 6,
		marginRight: 4,
		width: 6,
	},
	actionsCardItem: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingVertical: 30,
	},
	button: {
		alignItems: 'center',
		backgroundColor: WHITE,
		borderRadius: 30,
		elevation: 1,
		height: 60,
		justifyContent: 'center',
		marginHorizontal: 7,
		shadowColor: DARK_GRAY,
		shadowOffset: { height: 10, width: 0 },
		shadowOpacity: 0.15,
		shadowRadius: 20,
		width: 60,
	},
	miniButton: {
		alignItems: 'center',
		backgroundColor: WHITE,
		borderRadius: 30,
		elevation: 1,
		height: 40,
		justifyContent: 'center',
		marginHorizontal: 7,
		shadowColor: DARK_GRAY,
		shadowOffset: { height: 10, width: 0 },
		shadowOpacity: 0.15,
		shadowRadius: 20,
		width: 40,
	},

	city: {
		backgroundColor: WHITE,
		borderRadius: 20,
		elevation: 1,
		padding: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 },
		shadowOpacity: 0.05,
		shadowRadius: 10,
		width: 100,
	},
	cityText: {
		color: DARK_GRAY,
		fontSize: 13,
		textAlign: 'center',
	},

	filters: {
		backgroundColor: WHITE,
		borderRadius: 20,
		elevation: 1,
		padding: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 },
		shadowOpacity: 0.05,
		shadowRadius: 10,
		width: 90,
	},
	filtersText: {
		color: DARK_GRAY,
		fontSize: 13,
		textAlign: 'center',
	},

	containerMessage: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingHorizontal: 10,
		width: DIMENSION_WIDTH - 100,
	},
	avatar: {
		borderRadius: 30,
		height: 60,
		marginRight: 20,
		marginVertical: 15,
		width: 60,
	},
	message: {
		color: GRAY,
		fontSize: 12,
		paddingTop: 5,
	},

	containerProfileItem: {
		backgroundColor: WHITE,
		borderRadius: 8,
		elevation: 1,
		margin: 20,
		marginTop: -65,
		paddingBottom: 25,
		paddingHorizontal: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 },
		shadowOpacity: 0.05,
		shadowRadius: 10,
	},
	matchesProfileItem: {
		alignSelf: 'center',
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 20,
		marginTop: -15,
		paddingHorizontal: 20,
		paddingVertical: 7,
		width: 135,
	},
	matchesTextProfileItem: {
		color: WHITE,
		textAlign: 'center',
	},
	name: {
		color: DARK_GRAY,
		fontSize: 15,
		paddingBottom: 5,
		paddingTop: 25,
		textAlign: 'center',
	},
	descriptionProfileItem: {
		color: GRAY,
		fontSize: 13,
		paddingBottom: 20,
		textAlign: 'center',
	},
	info: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingVertical: 8,
	},
	iconProfile: {
		color: DARK_GRAY,
		fontSize: 12,
		paddingHorizontal: 10,
	},
	infoContent: {
		color: GRAY,
		fontSize: 13,
	},

	// CONTAINER - GENERAL
	bg: {
		flex: 1,
		height: DIMENSION_HEIGHT,
		resizeMode: 'cover',
		width: DIMENSION_WIDTH,
	},
	top: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 10,
		paddingTop: 50,
	},
	title: { color: DARK_GRAY, fontSize: 22, paddingBottom: 10 },

	containerHome: {
		marginHorizontal: 10,
	},

	containerMatches: {
		flex: 1,
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},

	containerMessages: {
		flex: 1,
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},

	containerProfile: { marginHorizontal: 0 },
	photo: {
		height: 450,
		width: DIMENSION_WIDTH,
	},
	topIconLeft: {
		paddingLeft: 20,
	},
	topIconRight: {
		paddingRight: 20,
	},
	actionsProfile: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	textButton: {
		color: WHITE,
		fontSize: 15,
		paddingLeft: 5,
	},
	circledButton: {
		alignItems: 'center',
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 25,
		height: 50,
		justifyContent: 'center',
		marginRight: 10,
		width: 50,
	},
	roundedButton: {
		alignItems: 'center',
		backgroundColor: SECONDARY_COLOR,
		borderRadius: 25,
		flexDirection: 'row',
		height: 50,
		justifyContent: 'center',
		marginLeft: 10,
		paddingHorizontal: 20,
	},

	tabButtonText: {
		textTransform: 'uppercase',
	},
	iconMenu: {
		alignItems: 'center',
	},
} as const);

export * from './buttons';
export * from './colors';
export * from './fonts';
export * from './inputs';
export * from './layout';
export * from './types';

export default ALL_STYLES;
