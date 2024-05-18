import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

import { FontSizeColorStyle } from '@/styles';

export function MyTabBar({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
	return (
		<Animated.View
			style={{
				flexDirection: 'row',
				width: '100%',
				backgroundColor: '#fff',
				height: 60,
				paddingHorizontal: 20,
				gap: 5,
				justifyContent: 'flex-start',
				alignItems: 'center',
			}}
		>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];

				const label = options.tabBarLabel ?? options.title ?? route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate({ name: route.name, merge: true });
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<TouchableOpacity
						key={route.key} // Add a key prop for each item in the map
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={{
							backgroundColor: isFocused ? '#F44586' : '#e7e7e7',
							borderRadius: 100,
							paddingHorizontal: 12,
							paddingVertical: 7,
						}}
					>
						<Animated.Text
							style={[
								FontSizeColorStyle['opensans-400-12-black'],
								{ color: isFocused ? '#fff' : '#000' },
							]}
						>
							{label}
						</Animated.Text>
					</TouchableOpacity>
				);
			})}
		</Animated.View>
	);
}

export default MyTabBar;
