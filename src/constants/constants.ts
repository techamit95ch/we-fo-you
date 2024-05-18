import { FontWithColors, responsive } from '@/styles';

export const ITUNES_ID = '' as const;

export const DOT_SIZE = responsive(12);

export const ISDARK_MODE = false;
export const SHOULD_DARK_HEADER = true;

export const DRAWER_BG = SHOULD_DARK_HEADER ? ('#232323' as const) : ('#fdfdfd' as const);

export const DRAWER_STYLE = !SHOULD_DARK_HEADER
	? FontWithColors['opensans-500-dark-414141']
	: FontWithColors['opensans-500-white'];

export const DRAWER_TEXT_COLOR = !SHOULD_DARK_HEADER ? ('#232323' as const) : ('#fdfdfd' as const);

export const DRAWER_GRADIENT_COLOR = !SHOULD_DARK_HEADER
	? ['#e1e1e1', '#fdfdfd', '#f1f1f1']
	: ['#313131', '#333333', '#434343'];

export const GEO_API_KEY = '8bc96d433b8a41f69cf09e0af59cf143' as const;
export const GOOGLE_WEbCLIENT_ID =
	'959244036811-sfjl21duicsj7mu88st9feug946el9hb.apps.googleusercontent.com' as const;
