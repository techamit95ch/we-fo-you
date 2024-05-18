import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'moti';

const IMAGES = [
	'https://plus.unsplash.com/premium_photo-1664099905313-f391570783fe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
	'https://images.unsplash.com/photo-1484863137850-59afcfe05386?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
	'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
	'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
	'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
	'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
	'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
];

const Galary = () => {
	const [image, setImage] = useState(IMAGES[0]);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				paddingHorizontal: 40,
				gap: 30,
				paddingBottom: 20,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Image
				source={{
					uri: image,
				}}
				style={{ width: '100%', height: 524, borderRadius: 10 }}
			/>
			<FlatList
				data={IMAGES}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => setImage(item)}
						style={{
							borderWidth: 1,
							borderColor: image === item ? '#F44586' : 'transparent',
							padding: 2,
							borderRadius: 8,
						}}
					>
						<Image
							style={{
								width: 64,
								height: 64,
								borderRadius: 8,
								opacity: image === item ? 1 : 0.5,
							}}
							source={{ uri: item }}
						/>
					</TouchableOpacity>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ gap: 15 }}
			/>
		</SafeAreaView>
	);
};

export default Galary;

const styles = StyleSheet.create({});
