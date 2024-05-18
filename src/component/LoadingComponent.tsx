import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '@/component/styles';
import ASSETS from '../../assets';
import { ALL_COLORS } from '@/styles';
import Animated, {
	useAnimatedStyle,
	withRepeat,
	withTiming,
	useSharedValue,
	Easing,
} from 'react-native-reanimated';
import {
	Canvas,
	Circle,
	RadialGradient,
	Skia,
	Shader,
	vec,
	Rect,
	TwoPointConicalGradient,
	Mask,
	Group,
} from '@shopify/react-native-skia';
import { useEffect } from 'react';
const AnimatedBG = Animated.createAnimatedComponent(ImageBackground);

const duration = 500;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);
const LoadingComponent = () => {
	const sv = useSharedValue<number>(0);
	const imageBool = useSharedValue<boolean>(false);

	useEffect(() => {
		sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
	}, []);

	const animatedImageStyle = useAnimatedStyle(() => {
		return {
			height: withTiming(sv.value > 0.45 ? 150 : 130),
			width: withTiming(sv.value > 0.45 ? 150 : 130),
			borderRadius: 180,
			transform: [{ scale: withTiming(sv.value > 0.45 ? 0.9 : 1) }],
		};
	});

	const animatedInnereStyle = useAnimatedStyle(() => {
		return {
			height: withTiming(sv.value > 0.57 ? 230 : 210),
			width: withTiming(sv.value > 0.57 ? 230 : 210),
			borderRadius: 180,
			transform: [{ scale: withTiming(sv.value > 0.57 ? 0.9 : 1) }],
		};
	});
	const animatedOuterStyle = useAnimatedStyle(() => {
		return {
			height: withTiming(sv.value > 0.6 ? 280 : 260),
			width: withTiming(sv.value > 0.6 ? 280 : 260),
			borderRadius: 180,
			transform: [{ scale: withTiming(sv.value > 0.5 ? 0.9 : 1) }],
		};
	});
	const animatedOuterBorderStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: withTiming(sv.value > 0.5 ? 0.9 : 1) }],
		};
	});

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: ALL_COLORS.white,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<View
				style={{
					height: 400,
					width: 400,
					alignItems: 'center',
					justifyContent: 'center',
					// backgroundColor: '#1E1E1E',
					position: 'relative',
				}}
			>
				<Animated.View
					style={[
						{
							borderColor: '#4B164C',
							borderWidth: 2,
							borderStyle: 'dashed',
							height: 280,
							width: 280,
							borderRadius: 150,
							alignItems: 'center',
							justifyContent: 'center',
							position: 'relative',
						},
						animatedOuterBorderStyle,
					]}
				>
					<Animated.View
						style={[
							{
								backgroundColor: '#E9E9FF',
								height: 280,
								width: 280,
								borderRadius: 140,
								alignItems: 'center',
								justifyContent: 'center',
								position: 'relative',
							},
							animatedOuterStyle,
						]}
					>
						{/* <Canvas
							style={{
								flex: 1,
								height: 180,
								width: 180,
								alignItems: 'center',
								justifyContent: 'center',
								position: 'absolute',
								top: 20,
								left: 20,
							}}
						>
							<Mask
								mask={
									<Group>
										<Circle cx={180} cy={180} r={180} color="white" />
										<Circle cx={180} cy={180} r={90} color="black" />
									</Group>
								}
							>
								<Circle cx={180} cy={180} r={180}>
									<TwoPointConicalGradient
										start={vec(180, 180)}
										startR={180}
										end={vec(180, 16)}
										endR={16}
										colors={['#F6F1F1', '#D4CEE8']}
									></TwoPointConicalGradient>
								</Circle>
							</Mask>
						</Canvas> */}
						<Animated.View
							style={[
								{
									backgroundColor: '#D4CEE8',
									borderColor: '#ffff',
									borderWidth: 2,
									height: 220,
									width: 220,
									borderRadius: 140,
									alignItems: 'center',
									justifyContent: 'center',
									position: 'relative',
								},
								animatedInnereStyle,
							]}
						>
							<Animated.Image
								source={ASSETS.mates}
								style={[
									{ height: 140, width: 140, borderRadius: 75 },
									animatedImageStyle,
								]}
								resizeMode={'cover'}
							/>
						</Animated.View>
					</Animated.View>
				</Animated.View>
			</View>

			{/* Sub Text */}
			<Text style={commonStyles.vsubText}>Let’s meet new people around you</Text>
		</SafeAreaView>
	);
};

export default LoadingComponent;

const styles = StyleSheet.create({});
