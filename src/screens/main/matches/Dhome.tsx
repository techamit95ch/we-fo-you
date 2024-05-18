import { useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shallowEqual } from 'react-redux';

import Tinder2, { TinderType } from '@/component/AppSlider/Tinder2';
import { useGetMatchesByAgeGenderQuery } from '@/store/apis';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLocation } from '@/store/slices';
import { FontSizeColorStyle } from '@/styles';
import LoadingComponent from '@/component/LoadingComponent';

export const USERS_DATA = [
	{
		img: require('../../../images/01.jpg'),
		name: 'Lady 1',
		occupation: 'JOb2 ',
		distance: '1 km',
		id: 1,
	},
	{
		img: require('../../../images/02.jpg'),
		name: 'Lady 2',
		occupation: 'JOb ',

		distance: '1 km',
		id: 2,
	},
	{
		img: require('../../../images/03.jpg'),
		name: 'Algorithm',
		occupation: 'Users ',
		distance: '1 km',
		id: 3,
	},
	{
		img: require('../../../images/04.jpg'),
		name: 'Algorithm',
		occupation: 'Users ',
		distance: '1 km',
		id: 4,
	},
	{
		img: require('../../../images/05.jpg'),
		name: 'Algorithm',
		occupation: 'Users ',
		distance: '1 km',
		id: 5,
	},
	{
		img: require('../../../images/06.jpg'),
		name: 'Algorithm',
		occupation: 'Users ',
		distance: '1 km',
		id: 5,
	},
	{
		img: require('../../../images/07.jpg'),
		name: 'Algorithm',
		occupation: 'Users ',
		distance: '1 km',
		id: 5,
	},
	{
		img: require('../../../images/08.jpg'),
		name: 'Algorithm',
		occupation: 'Users ',
		distance: '1 km',
		id: 5,
	},
	{
		img: require('../../../images/09.jpg'),
		name: 'Algorithm',
		occupation: 'Users ',
		distance: '1 km',
		id: 5,
	},
	{
		img: require('../../../images/10.jpg'),
		name: 'Algorithm',
		occupation: 'Users ',
		distance: '1 km',
		id: 5,
	},
];

const Dhome = () => {
	const user = useAppSelector((state) => state?.user, shallowEqual);

	const dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			try {
				// dispatch(getLocation({}));
				const result = await dispatch(getLocation({}));

				console.log('getLocation result:', result);
			} catch (_error) {}
		})();
	}, [dispatch]);

	const { data, isLoading } = useGetMatchesByAgeGenderQuery({ gender: user?.gender });

	const arrayData = useMemo(() => {
		const newData: TinderType[] = (data?.list || [])?.map((item, index) => {
			const data2 = {
				img: item?.avatar,
				name: item?.name || USERS_DATA[0]?.name || index?.toString(),
				distance: item?.distance || USERS_DATA[0]?.distance,
				city: item?.city,
				occupation: item?.job || USERS_DATA[0]?.occupation,
				id: item?._id || USERS_DATA[0]?.id,
			};

			return data2;
		});

		return newData;
	}, [data?.list]);

	if (isLoading) {
		return <LoadingComponent />;
	}
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
			<View
				style={{
					width: '100%',
					paddingHorizontal: 40,
					paddingVertical: 0,
					paddingBottom: 20,
					backgroundColor: 'white',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 5,
				}}
			>
				<Text style={FontSizeColorStyle['inter-600-20-black']}>Disover</Text>
				<Text style={FontSizeColorStyle['inter-600-12-black']}>{user?.city}</Text>
			</View>
			<Tinder2 data={arrayData} />
		</SafeAreaView>
	);
};

export default Dhome;
