import { createStackNavigator } from '@react-navigation/stack';

import Galary from '@/screens/main/profile/Galary';
import SingleMessage from '@/screens/main/messages/SingleMessage';
import Messages from '@/screens/main/messages/Messages';

export const MessageStack = createStackNavigator();

export const MessageNav = () => (
	<MessageStack.Navigator
		initialRouteName="Messages"
		screenOptions={{ headerShown: false, headerTintColor: '#F44586' }}
	>
		<MessageStack.Screen name="Messages" component={Messages} />
		<MessageStack.Screen
			name="Message"
			component={SingleMessage}
			options={{ headerTintColor: '#F44586', headerBackTitle: '', headerShown: false }}
		/>
		<MessageStack.Screen
			name="Galary"
			component={Galary}
			options={{ headerShown: true, headerTintColor: '#F44586', headerBackTitle: '' }}
		/>
	</MessageStack.Navigator>
);

export default MessageNav;
