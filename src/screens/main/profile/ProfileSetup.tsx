import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface ProfileSetupProps {
	// Add any necessary props
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({}) => {
	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.sectionTitle}>Profile Setup</Text>
			<TextInput style={styles.input} placeholder="Name" />
			<TextInput style={styles.input} placeholder="Email" />
			{/* Add more profile-related input fields */}
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		borderColor: 'gray',
		borderWidth: 1,
		height: 40,
		marginBottom: 12,
		paddingHorizontal: 10,
	},
	sectionContainer: {
		margin: 16,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
	},
});

export default ProfileSetup;
