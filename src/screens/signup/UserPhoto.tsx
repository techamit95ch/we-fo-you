import { useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shallowEqual } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';

import { commonStyles } from '@/component/styles';
import useImagePicker from '@/hooks/useImagePicker';
import { MainStackParamList } from '@/nav/MainStackNav';
import { useSaveuserMutation, useUploadMutation } from '@/store/apis';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeTempUser, setAuthenticated, setToken, setUser } from '@/store/slices';
import Animated from 'react-native-reanimated';

type StackParamList = MainStackParamList;

type OnboardingNumberNavigationProp = StackNavigationProp<StackParamList, 'UserPhoto'>;

const UserPhoto = ({ navigation }: { navigation: OnboardingNumberNavigationProp }) => {
	const [loading, setLoading] = useState(false);

	const { image, openCamera, openLibrary, cancelImage } = useImagePicker({
		multiple: false,
		allowsEditing: true,
	});

	const dispatch = useAppDispatch();

	const [location, cords, coordinates, city] = useAppSelector(
		(state) => [
			state?.user?.location,
			state?.user?.cords,
			state?.user?.coordinates,
			state?.user?.city,
		],
		shallowEqual
	);

	const preference = useAppSelector((state) => state?.user?.preference, shallowEqual);

	const tempser = useAppSelector((state) => state?.tempUser, shallowEqual);

	const [mutate] = useUploadMutation();

	const [save, { isLoading, error }] = useSaveuserMutation({
		fixedCacheKey: 'saveuser',
	});

	const upload = async () => {
		try {
			setLoading(true);
			if (!image) {
				throw new Error('Please Choose File');
			}

			const localUri = image.uri;

			const filename = localUri.split('/').pop() || '';

			// Infer the type of the image
			const match = /\.(\w+)$/.exec(filename);

			const type = match ? `image/${match[1]}` : `image`;

			const extension = filename?.split('.').pop() || '';

			if (!['jpg', 'png', 'jpeg', 'gif'].includes(extension.toLowerCase())) {
				throw new Error(filename || '' + 'Not Valid File' + extension);
			}
			const form = new FormData();

			// form.append('file', {});
			form.append('file', { uri: localUri, name: filename, type });

			const resData = await mutate(form);

			if (resData?.error) {
				throw new Error('Upload Failed');
			}

			const avatar = resData?.data?.location;

			const data = {
				...tempser,
				email: tempser?.email?.toLowerCase()?.trim(),
				location,
				cords,
				avatar,
				image: avatar,
				coordinates,
				city,
				preference,
				interest: tempser?.interests?.map((item) => item._id),
			};

			const res = await save(data);

			// @ts-ignore
			if (res?.error) {
				console.log({ error: res?.error, data, tempser });
				throw new Error('Signin Failed');
			}
			console.log({ res });

			await dispatch(setUser({ ...data, ...res?.data }));
			await dispatch(setToken(res?.data?.token));
			await dispatch(removeTempUser());
			await dispatch(setAuthenticated(true));
			await setLoading(false);

			await navigation.replace('AccessContactList');
		} catch (error) {
			console.log({ error });
			Alert.alert("Couldn't upload file", (error as Error)?.message);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={[commonStyles.container]}>
			<Text style={commonStyles.description}>Upload your photo</Text>
			{image ? (
				<View style={{ flex: 1, alignItems: 'center', gap: 20, justifyContent: 'center' }}>
					<Animated.Image
						source={image}
						style={{ height: 300, width: 300, borderRadius: 20 }}
						resizeMode="cover"
					/>
					<TouchableOpacity
						onPress={cancelImage}
						style={{
							borderRadius: 10,
							backgroundColor: 'rgba(0,0,0,0.05)',
							padding: 10,
							alignItems: 'center',
							justifyContent: 'center',
							width: 300,
						}}
					>
						<Text style={[commonStyles.buttonText, { color: 'red' }]}>
							Choose Another
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View
					style={[
						{
							backgroundColor: 'white',
							gap: 10,
							flexDirection: 'row',
							flex: 1,
							paddingVertical: 40,
							alignItems: 'center',
							justifyContent: 'center',
						},
					]}
				>
					<TouchableOpacity
						style={{
							flex: 1,
							borderRadius: 10,
							backgroundColor: 'rgba(0,0,0,0.1)',
							padding: 10,
							alignItems: 'center',
							justifyContent: 'center',
						}}
						onPress={openLibrary}
					>
						<Animated.Image
							source={{
								uri: 'https://cdn-icons-png.flaticon.com/512/3342/3342207.png',
							}}
							style={{ width: '100%', height: 300 }}
							resizeMode="contain"
						/>
						<Text style={[commonStyles.buttonText, { color: '#8e8e8e' }]}>
							Choose Galary
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							flex: 1,
							borderRadius: 10,
							backgroundColor: 'rgba(0,0,0,0.1)',
							padding: 10,
							alignItems: 'center',
							justifyContent: 'center',
						}}
						onPress={openCamera}
					>
						<Image
							source={{
								uri: 'https://cdn.iconscout.com/icon/free/png-256/free-camera-1811-461700.png',
							}}
							style={{ width: '100%', height: 300 }}
							resizeMode="contain"
						/>
						<Text style={[commonStyles.buttonText, { color: '#8e8e8e' }]}>
							Take Picture
						</Text>
					</TouchableOpacity>
				</View>
			)}

			<TouchableOpacity
				style={[
					commonStyles.button,
					{
						flexDirection: 'row',
						gap: 10,
						alignItems: 'center',
						justifyContent: 'center',
					},
				]}
				disabled={!image}
				onPress={upload}
			>
				{loading ? <ActivityIndicator color={'#fff'} size="small" /> : null}

				<Text style={commonStyles.buttonText}>Continue</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default UserPhoto;

const styles = StyleSheet.create({});
