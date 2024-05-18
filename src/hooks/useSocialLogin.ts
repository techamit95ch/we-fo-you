import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Application from 'expo-application';
import { ResponseType } from 'expo-auth-session';
import * as Facebook from 'expo-auth-session/providers/facebook';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

import { handleError } from '../utils/error';

import { GOOGLE_WEbCLIENT_ID } from '@/constants/env';
import { useAppDispatch } from '@/store/hooks';
import { setTempEmail, setTempUser } from '@/store/slices';

GoogleSignin.configure({
	scopes: ['profile', 'https://www.googleapis.com/auth/userinfo.profile'],
	webClientId: GOOGLE_WEbCLIENT_ID,
});

export type FaceBookResponse = {
	id: string;
	name: string;
	email: string;
	picture: Picture;
};

export type Picture = {
	data: Data;
};

export type Data = {
	height?: number;
	is_silhouette?: boolean;
	url: string;
	width?: number;
};

export type GoogleResponseData = {
	email: string;
	family_name: string;
	gender: string;
	given_name: string;
	hd: string;
	id: string;
	link: string;
	locale: string;
	name: string;
	picture: string;
	verified_email: boolean;
	preferences?: string[];
};

WebBrowser.maybeCompleteAuthSession();
export const getDeviceId = async () => {
	if (Platform.OS === 'android') {
		return Application.androidId;
	}

	return Constants.deviceId;
};
const useSocialLogin = () => {
	const [loading, setLoading] = useState<boolean>();

	const dispatch = useAppDispatch();

	const [_, response2, facebokAuth] = Facebook.useAuthRequest({
		clientId: '3243202119307130',
		responseType: ResponseType.Token,
	});

	const appleAuth = useCallback(async () => {
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});
		} catch (e) {
			handleError(e);
		}
	}, []);

	const googleAuth = useCallback(async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();

			dispatch(
				setTempUser({
					name: userInfo?.user?.name || '',
					avatar: userInfo?.user?.photo || '',
					email: userInfo?.user?.email,
				})
			);
			dispatch(setTempEmail(userInfo?.user?.email));

			return userInfo;
		} catch (error: unknown) {
			console.log({ error });
			handleError(error);
		}
	}, [dispatch]);

	const fetchFacebookUserInfo = useCallback(
		async (token?: string) => {
			setLoading(true);

			if (!token) {
				setLoading(false);

				return;
			}

			const url =
				`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,link,picture` as const;

			try {
				const userInfoResponse = await fetch(url);

				const userInfo: FaceBookResponse = await userInfoResponse.json();

				dispatch(
					setTempUser({
						name: userInfo?.name || '',
						avatar: userInfo?.picture?.data?.url || '',
						email: userInfo?.email,
					})
				);
			} catch (error) {
				handleError(error);
			} finally {
				setLoading(false);
			}
		},
		[dispatch]
	);

	useEffect(() => {
		WebBrowser.warmUpAsync();

		return () => {
			WebBrowser.coolDownAsync();
		};
	}, []);

	// useEffect(() => {
	// 	(async () => {
	// 		if (response2?.type === 'success') {
	// 			await fetchFacebookUserInfo(response2?.authentication?.accessToken);
	// 		}
	// 	})();
	// }, [fetchFacebookUserInfo, response2]);

	return {
		loading,
		googleAuth,
		facebokAuth,
		appleAuth,
		fetchFacebookUserInfo,
		facebookResponse: response2,
	};
};

export default useSocialLogin;
