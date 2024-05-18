import { createStackNavigator } from '@react-navigation/stack';

import EditNav from './EditNav';

import SettingScreen from '@/screens/main/settings/SettingScreen';

export const SettingsStack = createStackNavigator();

export const SettingsNav = () => (
	<SettingsStack.Navigator
		initialRouteName="Settings"
		screenOptions={{ headerShown: false, headerTintColor: '#F44586' }}
	>
		<SettingsStack.Screen name="Settings" component={SettingScreen} />
		<SettingsStack.Screen
			name="Edit"
			component={EditNav}
			options={{ headerShown: true, headerTintColor: '#F44586', headerBackTitle: '' }}
		/>
	</SettingsStack.Navigator>
);
