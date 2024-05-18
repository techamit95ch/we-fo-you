import {
	FlatList,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	SafeAreaView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Message, useGetMessagesQuery, useSendMessageMutation } from '@/store/apis';
import { handleError, isAndroid } from '@/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { RectButton } from 'react-native-gesture-handler';
import { Socket, io } from 'socket.io-client';
// import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { FontSizeColorStyle } from '@/styles';

const handleSocketEvents = <T extends unknown>(
	socket: Socket,
	eventName: string,
	callback: (data: T) => void
) => {
	socket.on(eventName, (data: T) => {
		callback(data);
	});
};

const SingleMessage = ({ navigation: nav, route }: { navigation: any; route: any }) => {
	const params = route?.params;
	const to = params?.to;

	const ref = useRef<FlatList>();
	const from = useAppSelector((state) => state?.user?._id || state?.user?.userId);

	const [livemessages, setLiveMessage] = useState<Message[]>([]);
	const [text, setText] = useState('');
	const [send, setSend] = useState(false);

	useEffect(() => {
		const socket = io('https://dev-api.b4you.in', {
			query: { userId: from },
		});

		handleSocketEvents(socket, 'connect', async () => {
			console.log('Connected');
		});
		handleSocketEvents(socket, 'message', async (_data: Message) => {
			console.log({ data: _data });
			setLiveMessage((prev) => [...prev, _data]);
			ref?.current?.scrollToEnd({ animated: true });
			Keyboard.dismiss();
		});
		if (send) {
			socket.emit('message', { from, to, text });
			setText('');
			setSend(false);
		}

		handleSocketEvents(socket, 'disconnect', async () => {
			console.log('des Connected');
		});

		handleSocketEvents<Error>(socket, 'error', (error) => {
			console.error('Socket.IO error for sendMessage:', error);
		});
	}, [from, to, text, send]);

	const { data = [] } = useGetMessagesQuery({ userId: from });

	const messages = [...data, ...livemessages];

	console.log(params?.avatar);

	const sendMesssage = async () => {
		try {
			console.log({ data, to, from, text });

			setSend(true);
			// await message({ to, from, text });
			// setText('');
		} catch (error) {
			console.log({ error });

			handleError(error);
		}
	};
	return (
		<SafeAreaView style={[styles.container, { backgroundColor: '#fff', padding: 0 }]}>
			<Animated.View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 10,
					padding: 10,
				}}
			>
				<Animated.Image
					source={{ uri: params?.avatar }}
					style={{ height: 60, width: 60, borderRadius: 30 }}
				/>
				<Animated.View style={{ flexDirection: 'column' }}>
					<Animated.Text style={FontSizeColorStyle['opensans-600-20-black']}>
						{params?.name}
					</Animated.Text>
					<Animated.Text
						style={[
							FontSizeColorStyle['opensans-400-12-black'],
							{ color: 'rgba(0, 0, 0, 0.70)' },
						]}
					>
						{params?.city || 'Chicago, IL United States'}
					</Animated.Text>
				</Animated.View>
			</Animated.View>

			<KeyboardAvoidingView
				behavior={'padding'}
				style={{
					flex: 1,
					padding: 20,
					paddingBottom: 0,
					backgroundColor: '#f1f1f1',
				}}
				keyboardVerticalOffset={100}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<>
						<FlatList
							data={messages || []}
							// data={data || []}
							contentContainerStyle={{ gap: 10, flexGrow: 1, paddingBottom: 200 }}
							style={{ flex: 1 }}
							ref={ref}
							keyboardShouldPersistTaps="handled"
							keyboardDismissMode="interactive"
							showsVerticalScrollIndicator={false}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={[
										item.from === from
											? { flexDirection: 'row' }
											: { flexDirection: 'row-reverse' },
										{
											alignItems: 'center',
											gap: 10,
											width: '100%',
										},
									]}
									onPress={() => nav.navigate('Galary')}
								>
									{/* <Image
										source={{ uri: item?. }}
										style={{
											borderRadius: 30,
											height: 30,
											width: 30,
										}}
									/> */}
									<View style={{ maxWidth: '90%' }}>
										<View
											style={[
												item.from === from
													? styles.messageSent
													: styles.messageReceived,
											]}
										>
											<Text style={styles.messageText}>{item.text}</Text>
										</View>
									</View>
								</TouchableOpacity>
							)}
							ListFooterComponentStyle={{
								position: 'absolute',
								flexDirection: 'row',
								gap: 5,
								bottom: 5,
								alignItems: 'center',
							}}
							ListFooterComponent={
								<>
									<></>
								</>
							}
						/>
						<KeyboardAvoidingView
							behavior={'padding'}
							// behavior="position"
							keyboardVerticalOffset={150}
							style={{
								position: 'absolute',
								flexDirection: 'row',
								gap: 5,
								paddingVertical: 5,
								alignItems: 'center',
								backgroundColor: '#f1f1f1',
								left: 20,
								right: 20,
								bottom: 10,
							}}
						>
							<TextInput
								style={{
									backgroundColor: '#e1e1e1',
									paddingHorizontal: 24,
									paddingVertical: 12,
									flex: 1,
									borderRadius: 5,
									fontSize: 13,
								}}
								onChangeText={setText}
								placeholder="Type here ....."
								value={text}
							/>
							<RectButton
								style={{
									backgroundColor: '#F44586',
									borderRadius: 5,
									padding: 7,
								}}
								onPress={sendMesssage}
							>
								<FontAwesome name="send" size={24} color="white" />
							</RectButton>
						</KeyboardAvoidingView>
					</>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default SingleMessage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	messageReceived: {
		backgroundColor: '#8e8e8e',
		borderRadius: 8,
		flex: 1,
		padding: 8,
	},
	messageSent: {
		backgroundColor: '#F44586',
		borderRadius: 8,
		flex: 1,
		padding: 8,
	},
	messageText: {
		color: '#f1f1f1',
		fontSize: 16,
	},
});
