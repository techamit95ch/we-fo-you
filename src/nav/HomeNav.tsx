import { Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DateNav from './DateNav';
import MessageNav from './MessageNav';
import { SettingsNav } from './SettingsNav';
import { HeartIcon, HomeIcon, LOGO, MessageIcon, MoreIcon, SortSVG } from './SortSVG';

import Matches from '@/screens/main/matches/Matches';

export const Tab = createBottomTabNavigator();

export const HomeNav = () => (
	<Tab.Navigator
		screenOptions={{
			headerShown: false,
			tabBarInactiveTintColor: '#C6CAD4',
			tabBarActiveTintColor: '#F44586',
			headerTitle: '',
			tabBarShowLabel: false,
			headerTintColor: '#F44586',
		}}
		detachInactiveScreens
	>
		<Tab.Screen name="Discover" component={DateNav} options={{ tabBarIcon: HomeIcon }} />
		<Tab.Screen
			name="Matches"
			component={Matches}
			options={{
				headerShown: true,
				headerTitle: 'Matches',
				tabBarIcon: HeartIcon,
				headerLeft: () => (
					<Image
						source={LOGO}
						style={{ height: '90%', width: 80, marginLeft: 10, marginBottom: 10 }}
						resizeMode="contain"
					/>
				),
				headerRight: () => (
					<TouchableOpacity
						style={{
							padding: 8,
							marginRight: 10,
							marginBottom: 10,
							backgroundColor: '#fff',
							borderColor: '#e1e1e1',
							borderWidth: 1,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 10,
						}}
					>
						<SortSVG />
					</TouchableOpacity>
				),
			}}
		/>
		<Tab.Screen
			name="Messages"
			component={MessageNav}
			options={{ headerShown: false, tabBarIcon: MessageIcon }}
		/>

		<Tab.Screen
			name="Settings"
			component={SettingsNav}
			options={{ headerShown: false, tabBarIcon: MoreIcon }}
		/>
	</Tab.Navigator>
);

export default HomeNav;
