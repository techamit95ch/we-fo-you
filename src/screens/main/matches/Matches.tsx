import { Dimensions, FlatList, Image, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import DEMO from '../../../data/demo';

import styles from '@/styles';
import { CardItemT } from '@/types';
import { isAndroid } from '@/utils';
import { useAppSelector } from '@/store/hooks';
import { shallowEqual } from 'react-redux';
import { useGetMatchesByAgeGenderQuery } from '@/store/apis';
import { useMemo } from 'react';
import Animated from 'react-native-reanimated';

const Item: React.FC<CardItemT & { navigation: any }> = ({
	image,
	name,
	description,
	navigation,
	id,
}) => (
	<RectButton
		style={{
			alignItems: 'center',
			backgroundColor: 'white',
			borderRadius: 15,
			elevation: 1,
			margin: 10,
			shadowColor: 'black',
			shadowOffset: { height: 0, width: 0 },
			shadowOpacity: 0.05,
			shadowRadius: 10,
			overflow: 'hidden',
			// flex: 1,
			// width: '80%',
		}}
		onPress={() => {
			// navigation.navigate('Profile');
			navigation.navigate('Profile', {
				id,
				image,
				name,
				tag: id,
			});
		}}
	>
		<Animated.Image
			source={image}
			style={{
				borderRadius: 15,
				width: Dimensions.get('window').width / 2 - 40,
				height: 230,
			}}
			sharedTransitionTag={id}
		/>
		<View
			style={{
				position: 'absolute',
				bottom: 50,
				width: '100%',
				padding: 10,
				backgroundColor: 'rgba(0,0,0,0.2)',
				overflow: 'hidden',
			}}
		>
			{/* NAME */}
			<Text
				style={{
					color: '#fff',
					fontSize: 15,
					fontWeight: '600',
				}}
				numberOfLines={1}
			>
				{name}
			</Text>

			{/* DESCRIPTION */}
			{description && (
				<Text style={styles.descriptionCardItem} numberOfLines={2}>
					{description}
				</Text>
			)}
		</View>

		{/* <BlurView
			style={{
				position: 'absolute',
				bottom: 15,
				width: '100%',
				padding: 10,
				justifyContent: 'space-between',
				alignItems: 'center',
				flexDirection: 'row',
				borderRadius: 10,
				height: 35,
				overflow: 'hidden',
			}}
		/> */}
		<BlurView
			tint="dark"
			style={{
				position: 'absolute',
				bottom: 0,
				width: '100%',
				padding: 10,
				justifyContent: 'space-between',
				alignItems: 'center',
				flexDirection: 'row',
				borderRadius: 0,

				borderBottomLeftRadius: 15,
				borderBottomRightRadius: 15,
				height: 50,
				overflow: 'hidden',
				backgroundColor: 'rgba(0,0,0,0.15)',
			}}
		>
			<Entypo name="cross" size={24} color="white" />
			<View style={{ width: 1, backgroundColor: 'white', height: '100%' }} />
			<Entypo name="heart" size={24} color="white" />
		</BlurView>
	</RectButton>
);

const Matches = ({ navigation }: { navigation: any }) => {
	const user = useAppSelector((state) => state?.user, shallowEqual);
	const { data } = useGetMatchesByAgeGenderQuery({ gender: user?.gender });
	const arrayData = useMemo(() => {
		const newData: CardItemT[] = (data?.list || [])?.map((item, index) => {
			const data2 = {
				image: { uri: item?.avatar },
				name: item?.name,
				distance: item?.distance,
				city: item?.city,
				occupation: item?.job,
				id: item?._id,
			};

			return data2;
		});

		return newData;
	}, [data?.list]);

	console.log({ arrayData });
	return (
		<View
			style={{
				flex: 1,
				// justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'white',
			}}
		>
			<Text
				style={{
					color: '#323755',
					textAlign: 'center',
					fontSize: 14,
					fontStyle: 'normal',
					fontWeight: '400',
					marginHorizontal: 40,
					marginVertical: 40,
				}}
			>
				This is a list of people who have liked you and your matches.
			</Text>
			<FlatList
				style={{ flex: 1 }}
				contentContainerStyle={{ gap: 10, justifyContent: 'center' }}
				columnWrapperStyle={{ flex: 1, gap: 10 }}
				numColumns={2}
				data={arrayData}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<Item
						{...item}
						image={item.image}
						name={item.name}
						isOnline={item.isOnline}
						hasVariant
						navigation={navigation}
					/>
				)}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default Matches;
