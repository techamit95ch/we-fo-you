import { Dimensions, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/core';

import styles, {
	DISLIKE_ACTIONS,
	FLASH_ACTIONS,
	LIKE_ACTIONS,
	STAR_ACTIONS,
	WHITE,
} from '../styles';
import { CardItemT } from '../types';

import Icon from './Icon';

const CardItem = ({
	description,
	hasActions,
	hasVariant,
	image,
	isOnline,
	matches,
	name,
}: CardItemT) => {
	// Custom styling
	const fullWidth = Dimensions.get('window').width;

	const imageStyle = [
		{
			borderRadius: 8,
			// width: "100%",
			width: hasVariant ? fullWidth / 2 - 30 : fullWidth - 80,
			height: hasVariant ? 230 : 350,
			margin: hasVariant ? 0 : 20,
		},
	];

	const nameStyle = [
		{
			paddingTop: hasVariant ? 10 : 15,
			paddingBottom: hasVariant ? 5 : 7,
			color: '#fff',
			fontSize: hasVariant ? 15 : 30,
		},
	];

	const navigation = useNavigation();

	return (
		<RectButton style={styles.containerCardItem} onPress={() => navigation.navigate('Profile')}>
			{/* IMAGE */}
			<ImageBackground
				source={image}
				style={{
					borderRadius: 8,
					// width: "100%",
					width: hasVariant ? fullWidth / 2 - 30 : fullWidth - 80,
					height: hasVariant ? 230 : 350,
					margin: hasVariant ? 0 : 20,
					justifyContent: 'flex-end',
				}}
				imageStyle={{
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10,
					borderBottomLeftRadius: 10,
					borderBottomRightRadius: 10,
				}}
			>
				<View
					style={{
						backgroundColor: 'rgba(0,0,0,0.3)',
						paddingHorizontal: 12,
						paddingVertical: 4,
						width: '100%',
					}}
				>
					{matches && (
						<View style={styles.matchesCardItem}>
							<Text style={styles.matchesTextCardItem}>
								<Icon name="heart" color={WHITE} size={13} /> {matches}% Match!
							</Text>
						</View>
					)}
					{/* MATCHES */}

					{/* NAME */}
					<Text style={nameStyle}>{name}</Text>

					{/* DESCRIPTION */}
					{description && <Text style={styles.descriptionCardItem}>{description}</Text>}

					{/* STATUS */}
					{!description && (
						<View style={styles.status}>
							<View style={isOnline ? styles.online : styles.offline} />
							<Text style={[styles.statusText, { color: '#f1f1f1' }]}>
								{isOnline ? 'Online' : 'Offline'}
							</Text>
						</View>
					)}
				</View>
				<BlurView
					style={{
						paddingHorizontal: 12,
						paddingVertical: 4,
						width: '100%',
						// position: 'absolute',
						// bottom: 0,
						borderBottomLeftRadius: 10,
						borderBottomRightRadius: 10,
						borderRadius: 10,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{/* ACTIONS */}
					{hasActions && (
						<View style={styles.actionsCardItem}>
							<TouchableOpacity style={styles.miniButton}>
								<Icon name="star" color={STAR_ACTIONS} size={14} />
							</TouchableOpacity>

							<TouchableOpacity style={styles.button}>
								<Icon name="heart" color={LIKE_ACTIONS} size={25} />
							</TouchableOpacity>

							<TouchableOpacity style={styles.button}>
								<Icon name="close" color={DISLIKE_ACTIONS} size={25} />
							</TouchableOpacity>

							<TouchableOpacity style={styles.miniButton}>
								<Icon name="flash" color={FLASH_ACTIONS} size={14} />
							</TouchableOpacity>
						</View>
					)}
				</BlurView>
			</ImageBackground>
		</RectButton>
	);
};

export default CardItem;
