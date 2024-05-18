import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

interface AppSettingsProps {
	// Add any necessary props
}

const AppSettings: React.FC<AppSettingsProps> = ({}) => {
	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.sectionTitle}>App Settings</Text>
			<View style={styles.settingItem}>
				<Text>Dark Mode</Text>
				<Switch value={false} />
			</View>
			<View style={styles.settingItem}>
				<Text>Notifications</Text>
				<Switch value={true} />
			</View>
			{/* Add more app-related settings */}
		</View>
	);
};

const styles = StyleSheet.create({
	sectionContainer: {
		margin: 16,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	settingItem: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
});

export default AppSettings;
