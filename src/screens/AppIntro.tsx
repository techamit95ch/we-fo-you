import { Image, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

import { commonStyles } from '@/component/styles';

import OnboardingFooter from '@/component/AppIntro/OnboardingFooter';
import Paralax from '@/component/AppSlider/Paralax';
import { MainStackParamList } from '@/nav/MainStackNav';
import { LayoutStyle } from '@/styles';

type StackParamList = MainStackParamList;

type AppIntroProps = {
	navigation: StackNavigationProp<StackParamList>;
};

const IMAGES = [
	{
		img: require('../images/girl2.png'),
		headLine: 'Algorithm',
		subHead: 'Users going through a vetting process to ensure you never match with bots.',
	},
	{
		img: require('../images/girl1.png'),
		headLine: 'Matches',
		subHead: `We match you with people that have a
large array of similar interests.`,
	},
	{
		img: require('../images/girl3.png'),
		headLine: 'Premium',
		subHead: `Sign up today and enjoy the first month
of premium benefits on us.`,
	},
];

function AppIntro({ navigation }: AppIntroProps) {
	const handleSignIn = () => {
		navigation.navigate('LoginType');
	};

	const handleCreateAccount = () => {
		navigation.navigate('SignUpType');
	};

	const bichi = ({ active }: { active: boolean }) => (
		<GestureHandlerRootView
			style={{ padding: 40, paddingBottom: 100, backgroundColor: 'white', flex: 5 }}
		>
			<Image
				style={[commonStyles.loginimage, { borderRadius: 20, flex: 1 }]}
				source={require('../../assets/logintype.png')}
			/>
			<View
				style={{
					// flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					gap: 10,
					padding: 40,
					paddingBottom: 20,
				}}
			>
				<Text
					style={{
						fontFamily: 'Open Sans',
						fontSize: 24,
						lineHeight: 36,
						color: '#F44586',
					}}
				>
					Create
				</Text>
				<Text
					style={{
						fontFamily: 'Open Sans',
						fontSize: 14,
						lineHeight: 21,
						color: '#323755',
					}}
				>
					We match you with people that have a large array of similar interests.
				</Text>
			</View>
		</GestureHandlerRootView>
	);

	return (
		<SafeAreaView style={LayoutStyle.fillWhite}>
			<GestureHandlerRootView style={commonStyles.containerlogin}>
				<GestureHandlerRootView style={[LayoutStyle.fill, { alignItems: 'center' }]}>

					<Paralax items={IMAGES} />
				</GestureHandlerRootView>
				<OnboardingFooter text={''} />
			</GestureHandlerRootView>
		</SafeAreaView>
	);
}

export default AppIntro;
