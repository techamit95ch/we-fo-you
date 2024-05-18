import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';

import { useGetUserQuery } from '@/store/apis';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeUser, setAuthenticated } from '@/store/slices';
import { FontSizeColorStyle } from '@/styles';

const SettingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
	const user = useAppSelector((state) => state?.user);

	const dispatch = useAppDispatch();

	const { data } = useGetUserQuery({ userId: user?._id });

	console.log({ user, data });

	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<Image
				source={{
					uri:
						data?.avatar ||
						user?.avatar ||
						'https://media.istockphoto.com/id/1454180339/photo/smiling-young-businesspeople-working-together-on-a-laptop-in-an-office.webp?b=1&s=170667a&w=0&k=20&c=ylRJorMIX4dbwBmRkM_ncUiJzGZC_Zbxtr0nL-nwg30=',
				}}
				style={styles.coverImage}
			/>
			<View
				style={{
					width: '100%',
					position: 'absolute',
					top: 100,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<View
					style={{ padding: 5, borderColor: 'white', borderWidth: 2, borderRadius: 100 }}
				>
					<Image
						source={{
							uri:
								user?.avatar ||
								'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
						}}
						style={{ height: 150, width: 150, borderRadius: 100 }}
					/>
				</View>
			</View>
			<View
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 5,
					marginTop: 70,
					paddingHorizontal: 40,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text style={FontSizeColorStyle['opensans-700-18-black']}>{user?.name}</Text>
				<TouchableOpacity style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
					<Entypo name="location-pin" size={13} color="#121212" />
					<Text>{user?.city}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						gap: 4,
						alignItems: 'center',
						backgroundColor: '#f2f2f2',
						borderRadius: 100,
						paddingHorizontal: 12,
						paddingVertical: 4,
					}}
					onPress={() => navigation.navigate('Edit')}
				>
					<FontAwesome name="pencil-square-o" size={16} color="#130F26" />
					<Text
						style={[FontSizeColorStyle['opensans-400-12-black'], { color: '#130F26' }]}
					>
						Edit Profile
					</Text>
				</TouchableOpacity>
			</View>

			{/* <PagerView style={{ flex: 1, marginTop: 100 }} initialPage={0}>
				<ProfileSetup />
				<AppSettings />
				<ImageGallery />
			</PagerView> */}
			<View style={{ marginTop: 30, paddingHorizontal: 20, gap: 10 }}>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						gap: 8,
						alignItems: 'center',
						backgroundColor: '#f2f2f2',
						borderRadius: 4,
						paddingHorizontal: 20,
						paddingVertical: 18,
						width: '100%',
					}}
				>
					<AntDesign name="setting" size={16} color="#130F26" />
					<Text
						style={[FontSizeColorStyle['opensans-400-12-black'], { color: '#130F26' }]}
					>
						Setting
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						gap: 8,
						alignItems: 'center',
						backgroundColor: '#f2f2f2',
						borderRadius: 4,
						paddingHorizontal: 20,
						paddingVertical: 18,
						width: '100%',
					}}
				>
					<AntDesign name="staro" size={16} color="#130F26" />
					<Text
						style={[FontSizeColorStyle['opensans-400-12-black'], { color: '#130F26' }]}
					>
						Rate US
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						paddingHorizontal: 20,
						paddingVertical: 18,
						width: '100%',
					}}
				>
					<Text
						style={[FontSizeColorStyle['opensans-400-12-black'], { color: '#130F26' }]}
					>
						Invite Friends
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						paddingHorizontal: 20,
						paddingVertical: 18,
						width: '100%',
					}}
				>
					<Text
						style={[FontSizeColorStyle['opensans-400-12-black'], { color: '#130F26' }]}
					>
						FAQ
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						paddingHorizontal: 20,
						paddingVertical: 18,
						width: '100%',
					}}
				>
					<Text
						style={[FontSizeColorStyle['opensans-400-12-black'], { color: '#130F26' }]}
						onPress={() => {
							dispatch(removeUser());
							dispatch(setAuthenticated(false));
							navigation.navigate('LoginType');
						}}
					>
						Logout
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	coverImage: {
		height: 200,
		resizeMode: 'cover',
		width: '100%',
	},
	coverImageContainer: {
		marginBottom: 40,
	},
});

export default SettingScreen;
