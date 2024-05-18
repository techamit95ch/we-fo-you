import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { FontSizeColorStyle, LayoutStyle } from '@/styles';

const EditPreference = () => {
	return (
		<View style={[LayoutStyle.screenLayout, LayoutStyle.fillWhite]}>
			<TextInput
				style={{
					backgroundColor: '#e7e7e7',
					width: '100%',
					paddingHorizontal: 12,
					paddingVertical: 8,
					borderRadius: 8,
					textAlign: 'justify',
					alignItems: 'flex-start',
					height: 100,
				}}
				placeholder="Dating Bio  (optional)"
				multiline
				numberOfLines={8}
			/>
			<Text style={FontSizeColorStyle['opensans-600-18-dark-4a4a4a']}>Looking For</Text>
			<ScrollView contentContainerStyle={{ gap: 20 }}>
				<TouchableOpacity
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
				>
					<Text>Male</Text>
				</TouchableOpacity>
				<TouchableOpacity
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
				>
					<Text>Female</Text>
				</TouchableOpacity>
				<TouchableOpacity
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
				>
					<Text>Male</Text>
				</TouchableOpacity>
				<TouchableOpacity
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
				>
					<Text>Male + Female Couple</Text>
				</TouchableOpacity>
				<TouchableOpacity
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
				>
					<Text>Male + Male Couple</Text>
				</TouchableOpacity>
				<TouchableOpacity
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
				>
					<Text>TS / TG / TB</Text>
				</TouchableOpacity>
			</ScrollView>

			<Button color={'#F44586'} title="Save" />
		</View>
	);
};

export default EditPreference;

const styles = StyleSheet.create({});
