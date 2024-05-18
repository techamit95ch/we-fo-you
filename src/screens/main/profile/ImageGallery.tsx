import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface ImageGalleryProps {
	// Add any necessary props
}

const ImageGallery: React.FC<ImageGalleryProps> = ({}) => {
	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.sectionTitle}>Image Gallery</Text>
			<Image
				source={{
					uri: 'https://media.istockphoto.com/id/1481370620/photo/portrait-of-two-creative-colleagues-using-laptop-to-discuss-work-project-at-office-young.webp?b=1&s=170667a&w=0&k=20&c=b8QniacgKeHkg93NAqxSB3AJYnLZwb8iQTAHrdf3cgA=',
				}}
				style={styles.image}
			/>
			{/* Add more images or a gallery component */}
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		height: 200,
		marginBottom: 12,
		resizeMode: 'cover',
		width: '100%',
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

export default ImageGallery;
