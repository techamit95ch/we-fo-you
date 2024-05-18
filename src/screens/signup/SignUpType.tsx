import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { commonStyles } from '@/component/styles';

import useSocialLogin, { FaceBookResponse } from '@/hooks/useSocialLogin';
import { useSocialSignUpMutation } from '@/store/apis';
import { FontSizeWithColors } from '@/styles';
import Animated from 'react-native-reanimated';
import AuthLayout from '@/component/AuthLayout';
import axios from 'axios';
import { FacebookResponseUser } from '../login/LoginType';
import { useAppDispatch } from '@/store/hooks';
import { setTempUser } from '@/store/slices';

type StackParamList = {
	Onboardingemail: undefined;
	OnboardingNumber: undefined;
	LoginType: undefined;
	// Add other screen names from your navigation stack here
};

type SignUpTypeProps = {
	navigation: StackNavigationProp<StackParamList, 'LoginType'>;
};

function SignUpType({ navigation }: SignUpTypeProps) {
	const { googleAuth, facebokAuth, appleAuth } = useSocialLogin();
	const dispatch = useAppDispatch();

	const [save, { isLoading, error }] = useSocialSignUpMutation({
		fixedCacheKey: 'sociallogin',
	});

	const handleEmailLogin = () => {
		navigation.navigate('Onboardingemail');
	};

	const handleGoogleLogin = async () => {
		try {
			const user = await googleAuth();

			const data = await save({ email: user?.user?.email, loginType: 'google' });
			// // @ts-ignore

			// if (data?.error) {
			// 	console.log({ _error: data?.error });

			// 	throw new Error('Login Failed');
			// }
			// // @ts-ignore
			// await dispatch(setUser({ ...data }));
			await navigation.replace('Onboardingemail');
		} catch (_error) {
			Alert.alert('Error', (_error as Error)?.message);
		}
	};

	const handleFacebokLogin = async () => {
		const { authentication } = (await facebokAuth()) as FacebookResponseUser;
		const token = authentication?.accessToken;
		const url =
			`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,link,picture` as const;
		const user = (await axios.get<FaceBookResponse>(url))?.data;
		navigation.navigate('Onboardingemail');
		const data = await save({ email: user?.email, loginType: 'google' });
		dispatch(
			setTempUser({
				name: user?.name || '',
				avatar: user?.picture?.data?.url || '',
				email: user?.email,
			})
		);
	};

	const handlePhoneLogin = () => {
		navigation.navigate('OnboardingNumber');
	};

	const handleSignIn = () => {
		navigation.navigate('LoginType');
	};

	return (
		<AuthLayout
			facebook={handleFacebokLogin}
			google={handleGoogleLogin}
			email={handleEmailLogin}
			phone={handlePhoneLogin}
			apple={appleAuth}
			redirect={handleSignIn}
			authType="signin"
		/>
	);
}

const styles = StyleSheet.create({});

export default SignUpType;
