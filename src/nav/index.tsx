import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MainStackNav from './MainStackNav';

LogBox.ignoreAllLogs(true);

function Application() {
	return (
		<NavigationContainer>
			<MainStackNav />
		</NavigationContainer>
	);
}

export default Application;
