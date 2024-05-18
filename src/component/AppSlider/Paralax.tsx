import { ImageSourcePropType, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import { SBItem } from '../AppIntro/SBItem';

import { window } from '@/constants';

const PAGE_WIDTH = window.width;

type ParalaxProps = {
	items?: { img?: ImageSourcePropType; headLine?: string; subHead?: string }[];
};

function Paralax({ items = [] }: ParalaxProps) {
	const progressValue = useSharedValue<number>(0);

	const baseOptions = {
		vertical: false,
		width: PAGE_WIDTH,
		height: 630,
	} as const;

	return (
		<View
			style={{
				alignItems: 'center',
			}}
		>
			<Carousel
				{...baseOptions}
				style={{
					width: PAGE_WIDTH,
				}}
				loop
				pagingEnabled={true}
				snapEnabled={true}
				autoPlay={true}
				autoPlayInterval={1500}
				onProgressChange={(_, absoluteProgress) =>
					(progressValue.value = Math.floor(absoluteProgress))
				}
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.8,
					parallaxScrollingOffset: 180,
					// parallaxScrollingOffset: 250,
				}}
				data={items}
				renderItem={({ index, item }) => (
					<SBItem index={index} {...item} progressValue={progressValue} />
				)}
			/>
		</View>
	);
}

export default Paralax;
