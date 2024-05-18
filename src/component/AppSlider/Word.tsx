import { Text } from 'react-native';

import { FontSizeColorStyle } from '@/styles';

const BOLD_STYLE = 'opensans-700-36-green-00fff0' as const;

const SMALL_STYLE = 'opensans-500-xl-white' as const;

const STYLE = {
	bold: FontSizeColorStyle[BOLD_STYLE],
	small: FontSizeColorStyle[SMALL_STYLE],
} as const;

const Word = ({
	text,
	index = 0,
	size = 'bold',
	extraDuration = 0,
}: {
	text: string;
	index?: number;
	size?: 'bold' | 'small';
	extraDuration?: number;
}) => (
	<Text
		style={STYLE[size]}
		// animate={{
		// 	opacity: 1,
		// 	scale: 1,
		// }}
		// from={{
		// 	opacity: 0,
		// 	scale: 0.9,
		// }}
		// transition={{
		// 	delay: extraDuration + index * (size === 'small' ? 200 : 300),
		// 	duration: size === 'small' ? 200 : 300,
		// 	type: 'timing',
		// }}
	>
		{text}
	</Text>
);

export default Word;
