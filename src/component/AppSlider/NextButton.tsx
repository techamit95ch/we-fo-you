import type React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { FontSizeColorStyle, responsive } from '@/styles';

interface NextButtonProps {
	onPress: () => void;
	disabled?: boolean;
	text?: React.ReactNode;
	icon?: 'next' | 'done' | 'skip' | 'start';
}

export const ICONS = {
	next: 'ios-play-forward',
	done: 'chevron-forward',
	skip: 'play-skip-back-outline',
	start: 'ios-arrow-forward',
} as const;

export const ICON_SIZE = responsive(15);

const NextButton: React.FC<NextButtonProps> = ({
	onPress,
	disabled,
	text = 'Next',
	icon = 'next',
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				styles.button,
				disabled && styles.disabled,
				icon === 'skip' ? styles.buttonRev : {},
			]}
		>
			<Text style={FontSizeColorStyle['roboto-400-12-white']}>{text}</Text>
			<Ionicons name={ICONS[icon]} size={ICON_SIZE} color="white" />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		gap: responsive(8),
	},
	buttonRev: {
		flexDirection: 'row-reverse',
	},

	disabled: {
		opacity: 0.4,
	},
});

export default NextButton;
