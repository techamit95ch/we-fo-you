import { Button, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';

import { useGetUserQuery } from '@/store/apis';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { FontSizeColorStyle, LayoutStyle } from '@/styles';

const EditContactInformation = () => {
	const user = useAppSelector((state) => state?.user);

	const dispatch = useAppDispatch();

	const { data } = useGetUserQuery({ userId: user?._id });

	console.log({ user });

	return (
		<View style={[LayoutStyle.screenLayout, LayoutStyle.fillWhite]}>
			<TextInput
				style={{
					backgroundColor: '#e7e7e7',
					width: '100%',
					paddingHorizontal: 12,
					paddingVertical: 8,
					borderRadius: 8,
				}}
				placeholder="Name"
				value={(data || user)?.name || ''}
			/>
			<Text style={FontSizeColorStyle['opensans-600-18-dark-4a4a4a']}>
				Contact Information
			</Text>
			<ScrollView contentContainerStyle={{ gap: 20 }}>
				<TextInput
					style={{
						backgroundColor: '#e7e7e7',
						width: '100%',
						paddingHorizontal: 12,
						paddingVertical: 8,
						borderRadius: 8,
					}}
					placeholder="+91  Enter Phone Number"
					value={(data || user)?.mobile || ''}
				/>
				<TextInput
					style={{
						backgroundColor: '#e7e7e7',
						width: '100%',
						paddingHorizontal: 12,
						paddingVertical: 8,
						borderRadius: 8,
					}}
					placeholder="Date of Birth"
					value={(data || user)?.dob || ''}
				/>
				<TextInput
					style={{
						backgroundColor: '#e7e7e7',
						width: '100%',
						paddingHorizontal: 12,
						paddingVertical: 8,
						borderRadius: 8,
					}}
					placeholder="Location"
					value={(data || user)?.location || ''}
				/>
				<Picker
					selectedValue={(data || user)?.gender || 'Male'}
					style={{
						borderColor: '#F2F2F2',
						borderWidth: 1,
						marginBottom: 10,
						marginRight: 10,
						width: '100%',
						backgroundColor: '#e7e7e7',
						paddingHorizontal: 12,
						paddingVertical: 8,
						borderRadius: 8,
					}}
					collapsable
					// onValueChange={(itemValue: string) => setSelectedGender(itemValue)}
				>
					<Picker.Item label="Male" value="Male" />
					<Picker.Item label="Female" value="Female" />
					<Picker.Item label="Both" value="Both" />
				</Picker>
				<TextInput
					style={{
						backgroundColor: '#e7e7e7',
						width: '100%',
						paddingHorizontal: 12,
						paddingVertical: 8,
						borderRadius: 8,
					}}
					value={(data || user)?.height || ''}
					placeholder="Height"
				/>
			</ScrollView>

			<Button color={'#F44586'} title="Save" />
		</View>
	);
};

export default EditContactInformation;

const styles = StyleSheet.create({});
