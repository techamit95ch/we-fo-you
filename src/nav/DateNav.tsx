import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import Dhome from '@/screens/main/matches/Dhome';
import Galary from '@/screens/main/profile/Galary';

import SingleMessage from '@/screens/main/messages/SingleMessage';
import { Profile, Profile2 } from '@/screens';

export const DateStack = createStackNavigator();

export const DateNav = () => (
	<DateStack.Navigator
		initialRouteName="Home"
		screenOptions={{ headerShown: false, headerTintColor: '#F44586' }}
	>
		<DateStack.Screen
			name="Home"
			component={Dhome}
			options={{
				headerShown: false,
			}}
		/>
		<DateStack.Screen
			name="Profile"
			component={Profile}
			options={{
				headerShown: true,
				headerTintColor: '#F44586',
				headerBackTitle: '',
				headerTransparent: true,
			}}
		/>
		<DateStack.Screen
			name="Profile2"
			component={Profile2}
			options={{
				headerShown: true,
				headerTintColor: '#f1f1f1',
				headerBackTitle: '',
				headerTitle: '',
				headerTransparent: true,
				headerLeft: (props) => (
					<TouchableOpacity
						style={{
							borderWidth: 1,
							borderColor: '#fff',
							borderRadius: 15,
							padding: 10,
							backgroundColor: 'rgba(255,255,255,0.3)',
							marginLeft: 20,
						}}
						activeOpacity={0.5}
						onPress={props?.onPress}
					>
						<Entypo name="chevron-left" size={24} color="white" />
					</TouchableOpacity>
				),
			}}
		/>
		<DateStack.Screen
			name="Galary"
			component={Galary}
			options={{ headerShown: true, headerTintColor: '#F44586', headerBackTitle: '' }}
		/>
		<DateStack.Screen
			name="Message"
			component={SingleMessage}
			options={{ headerShown: false, headerTintColor: '#F44586', headerBackTitle: '' }}
		/>
	</DateStack.Navigator>
);

export default DateNav;
