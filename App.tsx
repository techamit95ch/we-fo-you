// import Animated from 'react-native-reanimated';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { PersistGate } from 'redux-persist/integration/react';

import * as SplashScreen from 'expo-splash-screen';

import { FontFamily } from '@/constants/fonts';
import Application from '@/nav';
import store, { persistor } from '@/store';
import LoadingComponent from '@/component/LoadingComponent';
import { useLayoutEffect } from 'react';
SplashScreen.preventAutoHideAsync();

function App() {
	const [fontsLoaded] = useFonts(FontFamily);
	useLayoutEffect(() => {
		const fn = async () => {
			if (fontsLoaded) {
				await SplashScreen.hideAsync();
			}
		};
		fn();
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return <LoadingComponent />;
	}

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Application />
			</PersistGate>
		</Provider>
	);
}

export default App;
