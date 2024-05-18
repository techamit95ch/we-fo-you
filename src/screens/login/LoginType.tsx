import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { commonStyles } from '@/component/styles';

import useSocialLogin, { Picture } from '@/hooks/useSocialLogin';
import { useSocialloginMutation } from '@/store/apis/user';
import { useAppDispatch } from '@/store/hooks';
import { removeTempUser, setAuthenticated, setUser } from '@/store/slices';
import { FontSizeWithColors } from '@/styles';
import Animated from 'react-native-reanimated';
import AuthLayout from '@/component/AuthLayout';
import axios from 'axios';

type StackParamList = {
	Loginemail: undefined;
	LoginNumber: undefined;
	SignUpType: undefined;
	LoginType: undefined;
	Loading: undefined;
};

type LoginTypeProps = {
	navigation: StackNavigationProp<StackParamList, 'LoginType'>;
};

export type FacebookResponseUser = {
	authentication?: Authentication;
	error?: null;
	errorCode?: null;
	params?: Params;
	type?: string;
	url?: string;
};

export type Authentication = {
	accessToken?: string;
	expiresIn?: string;
	idToken?: string;
	issuedAt?: number;
	refreshToken?: string;
	scope?: string;
	state?: string;
	tokenType?: string;
};

export type FaceBookResponse = {
	id: string;
	name: string;
	email: string;
	picture: Picture;
};

export type Params = {
	access_token?: string;
	data_access_expiration_time?: string;
	expires_in?: string;
	state?: string;
};

function LoginType({ navigation }: LoginTypeProps) {
	const [save, { isLoading, error }] = useSocialloginMutation({
		fixedCacheKey: 'sociallogin',
	});

	const { googleAuth, facebokAuth, appleAuth } = useSocialLogin();

	const dispatch = useAppDispatch();

	const handleGoogleLogin = async () => {
		try {
			const user = await googleAuth();

			const data = await save({
				email: user?.user?.email,
				loginType: 'google',
				token: user?.idToken || '',
			});
			// @ts-ignore

			if (data?.error) {
				// @ts-ignore
				throw new Error(data?.error?.data?.message);
			}
			// @ts-ignore
			await dispatch(setUser({ ...data?.data }));
			await dispatch(removeTempUser());
			await dispatch(setAuthenticated(true));
			await navigation.replace('Loading');
		} catch (_error) {
			console.log({ _error });
			Alert.alert('Error', (_error as Error)?.message);
		}
	};

	const handleFacebokLogin = async () => {
		try {
			const { authentication } = (await facebokAuth()) as FacebookResponseUser;
			const token = authentication?.accessToken;
			const url =
				`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,link,picture` as const;
			const user = (await axios.get<FaceBookResponse>(url))?.data;
			const data = await save({ email: user?.email, loginType: 'google', token });
			// @ts-ignore
			if (data?.error) {
				console.log(data);
				// @ts-ignore
				throw new Error(data?.error?.data?.message);
			}
			// @ts-ignore
			await dispatch(setUser({ ...data?.data }));

			console.log({ user });
			await dispatch(removeTempUser());
			await dispatch(setAuthenticated(true));
			await navigation.replace('Loading');
		} catch (_error) {
			Alert.alert('Error', (_error as Error)?.message);
		}
	};

	const handleEmailLogin = () => {
		navigation.navigate('Loginemail');
	};

	const handlePhoneLogin = () => {
		navigation.navigate('LoginNumber');
	};

	const handleSignIn = () => {
		navigation.navigate('SignUpType');
	};

	return (
		<AuthLayout
			facebook={handleFacebokLogin}
			google={handleGoogleLogin}
			email={handleEmailLogin}
			phone={handlePhoneLogin}
			apple={appleAuth}
			redirect={handleSignIn}

		/>
	);
}

const styles = StyleSheet.create({});

export default LoginType;
