import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
	FlatList,
	FlatListProps,
	ImageSourcePropType,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewProps,
} from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import TinderItem from './TinderItem';

import { window } from '@/constants';
import Animated from 'react-native-reanimated';
import { useSwipeRightAgainMutation, useSwipeRightMutation } from '@/store/apis';
import { useAppSelector } from '@/store/hooks';

export type TinderType = {
	img?: ImageSourcePropType;
	name?: string;
	distance?: string;
	city?: string;
	occupation?: string;
	id?: string;
};

const MatchedIrtem = ({
	first,
	rotate = first ? 10 : -10,
	style,
	image = first
		? 'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
		: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
	...props
}: ViewProps & { rotate?: number; image?: string; first?: boolean }) => (
	<View
		style={[
			{
				height: 240,
				width: 160,
				borderRadius: 15,
				shadowColor: '#000',
				shadowOffset: {
					width: 1,
					height: 1,
				},
				shadowOpacity: 0.5,
				shadowRadius: 20,
				elevation: 30,
				transform: [{ rotate: `${rotate}deg` }],
				top: first ? 30 : 80,
			},
			first ? { position: 'absolute', right: 50 } : { position: 'absolute', left: 50 },
			style,
		]}
		{...props}
	>
		<Animated.Image
			source={{
				uri: image,
			}}
			style={{ height: 240, width: 160, borderRadius: 15 }}
		/>
		<TouchableOpacity
			style={[
				{
					backgroundColor: 'rgba(255,255,255,0.7)',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: 100,
					height: 60,
					width: 60,
					position: 'absolute',
					left: -30,

					shadowColor: '#000',
					shadowOffset: {
						width: 1,
						height: 1,
					},
					shadowOpacity: 0.5,
					shadowRadius: 20,
					elevation: 10,
				},
				first ? { top: -30 } : { bottom: -30 },
			]}
		>
			<Ionicons name="heart" size={30} color={'#F44586'} />
		</TouchableOpacity>
	</View>
);

const TinderScreen: React.FC<Partial<FlatListProps<TinderType>>> = ({ data = [], ...props }) => {
	const flatListRef = useRef<FlatList | null>(null);

	const [isModalVisible, setModalVisible] = useState(false);

	const user = useAppSelector((state) => state?.user);
	const navigation = useNavigation();

	const [selected, setSelected] = useState<number[]>([]);

	const filteredData = useMemo(() => {
		return data?.reverse()?.filter((_, index) => !selected.includes(index)) ?? [];
	}, [data, selected]);

	const [right, { isLoading, error }] = useSwipeRightMutation({
		fixedCacheKey: 'swipeRight',
	});

	const handleSwipe = useCallback(
		async (direction: 'left' | 'right' | 'top' | 'bottom', index: number, id: string) => {
			try {
				console.log({ user });
				if (flatListRef?.current) {
					const newIndex =
						direction === 'right' || direction === 'top'
							? index + 1 < filteredData?.length - 1
								? index + 1
								: filteredData?.length - 1
							: index - 1 <= 0
								? 0
								: index - 1;

					if (newIndex === 0) {
						setSelected([]);
						flatListRef.current.scrollToIndex({ index: 0, animated: true });

						return;
					}
					if (direction === 'right') {
						await right({ to: id, from: user?._id });
					}
					// setModalVisible(newIndex > 0 && newIndex % 5 === 0);

					flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
					setSelected((prev) => [...prev, index]);
				}
			} catch (err) {
				console.error(err);
			}
		},
		[filteredData, user]
	);

	const renderItem = useCallback(
		({ item, index }: { item: TinderType; index: number }) => (
			<TinderItem
				handleSwipe={async (direction: 'left' | 'right' | 'top' | 'bottom') =>
					await handleSwipe(direction, index, item?.id)
				}
				{...item}
				index={index}
			/>
		),
		[handleSwipe]
	);

	const getItemLayout = useCallback(
		(_, index: number) => ({
			length: window.width,
			offset: window.width * index,
			index,
		}),
		[]
	);

	return (
		<View style={styles.container}>
			<FlatList
				ref={(ref) => (flatListRef.current = ref)}
				data={filteredData}
				renderItem={renderItem}
				keyExtractor={(_, index) => index?.toString()}
				// horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				shouldRasterizeIOS
				showsVerticalScrollIndicator={false}
				scrollEventThrottle={16}
				// initialNumToRender={10} // Adjust based on your needs
				// maxToRenderPerBatch={10} // Adjust based on your needs
				updateCellsBatchingPeriod={50} // Adjust based on your needs
				getItemLayout={getItemLayout}
				// windowSize={10} // Adjust based on your needs
				style={{ flex: 1 }}
				contentContainerStyle={{
					position: 'absolute',
					flex: 1,
					overflow: 'hidden',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					// backgroundColor: 'blue',
				}}
				{...props}
			/>
			<Modal
				isVisible={isModalVisible}
				presentationStyle={'overFullScreen'}
				style={{
					backgroundColor: '#e1e1e1',
					borderRadius: 30,
					position: 'relative',
					flex: 1,
				}}
				backdropColor="rgba(255,255,255,0.6)"
			>
				<View
					style={{
						backgroundColor: '#fff',
						flex: 1,
						borderRadius: 30,
						shadowColor: '#000',
						shadowOffset: {
							width: 1,
							height: 1,
						},
						shadowOpacity: 0.5,
						shadowRadius: 20,
						elevation: 10,
						position: 'relative',
					}}
				>
					<View
						style={{
							marginTop: 60,
							marginBottom: 20,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							height: 340,
							position: 'relative',
						}}
					>
						<MatchedIrtem first />
						<MatchedIrtem rotate={-10} />
					</View>
					<View style={{ width: '100%', gap: 10, marginTop: 30 }}>
						<Text
							style={{
								fontSize: 28,
								color: '#F44586',
								textAlign: 'center',
								fontWeight: '600',
							}}
						>
							It's a Match
						</Text>
						<Text
							style={{
								fontSize: 13,
								color: 'rgba(0, 0, 0, 0.70)',
								textAlign: 'center',
							}}
						>
							Start a conversation now with each other
						</Text>
					</View>
					<View
						style={{
							margin: 30,
							marginTop: 100,
							position: 'relative',
							gap: 10,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<TouchableOpacity
							style={{
								padding: 16,
								width: 300,
								borderRadius: 8,
								borderWidth: 1,
								borderColor: '#F44586',
								position: 'relative',
								shadowColor: '#F44586',
								shadowOffset: {
									width: 1,
									height: 1,
								},
								shadowOpacity: 1,
								shadowRadius: 2,
								elevation: 30,
								backgroundColor: '#F44586',
								alignItems: 'center',
							}}
							onPress={() => {
								navigation.navigate('Message'), setModalVisible(false);
							}}
						>
							<Text style={{ color: '#f1f1f1', fontWeight: '700' }}>Say Hello</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								padding: 16,
								width: 300,
								borderRadius: 8,
								borderWidth: 1,
								borderColor: '#F7D8DC',
								position: 'relative',
								shadowColor: '#F7D8DC',
								shadowOffset: {
									width: 1,
									height: 1,
								},
								shadowOpacity: 1,
								shadowRadius: 2,
								elevation: 30,
								backgroundColor: '#F7D8DC',
								alignItems: 'center',
							}}
							onPress={() => setModalVisible(false)}
						>
							<Text style={{ color: '#F44586', fontWeight: '700' }}>
								Keep swiping
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		position: 'relative',
	},
});

export default TinderScreen;
