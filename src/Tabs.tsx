import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabBarIcon from './component/TabBarIcon';
import Home from './screens/main/matches/Dhome';
import Matches from './screens/main/matches/Matches';
import Messages from './screens/Messages';
import Profile from './screens/Profile';
import { BLACK, DARK_GRAY, PRIMARY_COLOR, WHITE } from './styles';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Tabs = () => (
	<NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name="Tab" options={{ headerShown: false, animationEnabled: false }}>
				{() => (
					<Tab.Navigator
						tabBarOptions={{
							showLabel: false,
							activeTintColor: PRIMARY_COLOR,
							inactiveTintColor: DARK_GRAY,
							labelStyle: {
								fontSize: 14,
								textTransform: 'uppercase',
								paddingTop: 10,
							},
							style: {
								backgroundColor: WHITE,
								borderTopWidth: 0,
								marginBottom: 0,
								shadowOpacity: 0.05,
								shadowRadius: 10,
								shadowColor: BLACK,
								shadowOffset: { height: 0, width: 0 },
							},
						}}
					>
						<Tab.Screen
							name="Explore"
							component={Home}
							options={{
								tabBarIcon: ({ focused }) => (
									<TabBarIcon
										focused={focused}
										iconName="search"
										text="Explore"
									/>
								),
							}}
						/>

						<Tab.Screen
							name="Matches"
							component={Matches}
							options={{
								tabBarIcon: ({ focused }) => (
									<TabBarIcon focused={focused} iconName="heart" text="Matches" />
								),
							}}
						/>

						<Tab.Screen
							name="Chat"
							component={Messages}
							options={{
								tabBarIcon: ({ focused }) => (
									<TabBarIcon
										focused={focused}
										iconName="chatbubble"
										text="Chat"
									/>
								),
							}}
						/>

						<Tab.Screen
							name="Profile"
							component={Profile}
							options={{
								tabBarIcon: ({ focused }) => (
									<TabBarIcon
										focused={focused}
										iconName="person"
										text="Profile"
									/>
								),
							}}
						/>
					</Tab.Navigator>
				)}
			</Stack.Screen>
		</Stack.Navigator>
	</NavigationContainer>
);

export default Tabs;
