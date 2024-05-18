import { shallowEqual } from 'react-redux';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import HomeNav from './HomeNav';

import * as Screens from '@/screens';
import { useAppSelector } from '@/store/hooks';

const ROUTES = {
	APP_INTRO: 'AppIntro',
	LOGIN_TYPE: 'LoginType',
	LOGIN_NUMBER: 'LoginNumber',
	LOGIN_EMAIL: 'Loginemail',
	SIGN_UP_TYPE: 'SignUpType',
	ONBOARDING_EMAIL: 'Onboardingemail',
	ONBOARDING_NUMBER: 'OnboardingNumber',
	OTP_SCREEN_PH: 'OTPScreenph',
	VERIFICATION_SUCCESSFUL: 'VerificationSuccessful',
	COMPLETE_PROFILE: 'CompleteYourProfile',
	SELECT_GENDER: 'Selectgender',
	SET_PASSWORD: 'Setpassword',
	ON_INTERESTS: 'Oninterests',
	THANKS_ONBOARDING: 'Thanksforonboarding',
	SETUP_PREFERENCES: 'Setuppreferences',
	USER_PHOTO: 'UserPhoto',
	LOADING: 'Loading',
	D_HOME: 'Dhome',
	PROFILE: 'Profile',
	MESSAGE: 'SingleMessage',
	GALARY: 'Galary',
	ENABLE_NOTIFICATION: 'EnableNotification',
	ACCESS_CONTACT_LIST: 'AccessContactList',
} as const;

export type MainStackParamList = {
	[key in (typeof ROUTES)[keyof typeof ROUTES]]: undefined;
};

type MainStackNavigationOptions = StackNavigationOptions & {
	headerTintColor?: string;
	headerBackTitle?: string;
	headerTitle?: string;
	headerTransparent?: boolean;
};

export const Stack = createStackNavigator<MainStackParamList>();

// MainStackNav component
const MainStackNav = () => {
	const { authenticated, onboarding: onboarded } = useAppSelector(({ app }) => app, shallowEqual);

	const screenOptions: MainStackNavigationOptions = {
		headerShown: false,
		headerTintColor: '#F44586',
	};

	return (
		<Stack.Navigator
			initialRouteName={
				onboarded ? (authenticated ? ROUTES.D_HOME : ROUTES.LOGIN_TYPE) : ROUTES.APP_INTRO
			}
			screenOptions={screenOptions}
		>
			{Object.entries(ROUTES).map(([name, component]) => (
				<Stack.Screen
					key={name}
					name={
						ROUTES[name as keyof typeof ROUTES] as unknown as keyof MainStackParamList
					}
					component={name === 'D_HOME' ? HomeNav : Screens[component]}
				/>
			))}
		</Stack.Navigator>
	);
};

export default MainStackNav;
