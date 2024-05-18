import {
	FlatList,
	Image,
	ImageBackground,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shallowEqual } from 'react-redux';
import { Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import { useGetMessagesQuery } from '@/store/apis';
import { useAppSelector } from '@/store/hooks';
import ASSETS from '../../../../assets';
import { Message } from '@/component';
import DEMO from '@/data/demo';
import styles from '@/styles';

const Messages = () => {
	const nav = useNavigation();

	const userId = useAppSelector(
		(state) => state?.user?.userId || state?.user?._id || '65c7ba1cabd009069bc34b98',
		shallowEqual
	);

	const { data } = useGetMessagesQuery({ userId });

	return (
		<ImageBackground source={ASSETS.bg} style={styles.bg}>
			<SafeAreaView style={styles.containerMessages}>
				<Image
					source={ASSETS.wefoyou}
					style={{ height: 49, width: 216, alignSelf: 'center', marginTop: 20 }}
					resizeMode="contain"
				/>
				<View style={[styles.top, { paddingTop: 20, gap: 10 }]}>
					<TextInput
						style={{
							backgroundColor: '#e1e1e1',
							paddingHorizontal: 24,
							paddingVertical: 12,
							flex: 1,
							borderRadius: 5,
							fontSize: 11,
						}}
						placeholder="Search ..."
					/>
					<TouchableOpacity
						style={{
							backgroundColor: '#F44586',
							borderRadius: 5,
							padding: 7,
						}}
					>
						<Foundation name="magnifying-glass" size={20} color="white" />
					</TouchableOpacity>
				</View>
				<View
					style={{
						flexDirection: 'column',
						marginHorizontal: 10,
						paddingVertical: 20,
						gap: 10,
					}}
				>
					<Text style={styles.title}>Recent Chats</Text>
					<FlatList
						data={DEMO}
						keyExtractor={(item, index) => index.toString()}
						horizontal
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ gap: 5 }}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={{
									padding: 5,
									borderRadius: 100,
									borderColor: '#F44586',
									borderStyle: 'dotted',
									borderWidth: 2,
								}}
							>
								<Image
									source={item.image}
									style={{
										borderRadius: 30,
										height: 60,
										width: 60,
									}}
								/>
							</TouchableOpacity>
						)}
					/>
				</View>

				<FlatList
					data={DEMO}
					keyExtractor={(item, index) => index.toString()}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => nav.navigate('Message')}>
							<Message
								image={item.image}
								name={item.name}
								lastMessage={item.message}
							/>
						</TouchableOpacity>
					)}
				/>
			</SafeAreaView>
		</ImageBackground>
	);
};

export default Messages;
