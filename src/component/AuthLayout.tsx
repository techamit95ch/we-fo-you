import { StatusBar, Text, View } from 'react-native';
import { GestureHandlerRootView, RectButton, ScrollView } from 'react-native-gesture-handler';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import { commonStyles } from '@/component/styles';

import { FontSizeWithColors, FontStyle } from '@/styles';
import Animated from 'react-native-reanimated';
import { isAndroid } from '@/utils';
import ASSETS from '../../assets';

type AuthLayoutProps = {
	facebook?: () => Promise<void> | void;
	google?: () => Promise<void> | void;
	email?: () => Promise<void> | void;
	phone?: () => Promise<void> | void;
	apple?: () => Promise<void> | void;
	redirect?: () => Promise<void> | void;
	loading?: boolean;
	authType?: 'login' | 'signin';
};

const AuthLayout: React.FC<AuthLayoutProps> = ({
	facebook,
	google,
	email,
	phone,
	apple,
	redirect,
	authType = 'login',
}) => (
	<ScrollView
		style={{ flex: 1, backgroundColor: '#fff' }}
		contentContainerStyle={{ flexGrow: 1, paddingVertical: 60, backgroundColor: '#fff' }}
		showsVerticalScrollIndicator={false}
	>
		<StatusBar hidden />
		<GestureHandlerRootView style={commonStyles.containerlogin}>
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
					gap: 20,
				}}
			>
				{/* <Animated.Image
					style={{ height: 50, width: 216 }}
					source={ASSETS.wefoyou}
					// source={require('../../assets/wefoyou.png')}
					resizeMode="contain"
				/> */}
				<Animated.Image
					style={{ height: 380, width: 245 }}
					source={ASSETS.loginbg}
					// source={require('../../assets/mates.png')}
					resizeMode="cover"
				/>
			</View>

			<View style={[commonStyles.lcontainer, { paddingHorizontal: 40 }]}>
				<Text
					style={{
						color: '#1E1E1E',
						fontSize: 16,
						...FontStyle['inter-500'],
						width: '100%',
					}}
				>
					{' '}
					Let's get you in{' '}
				</Text>

				<RectButton style={commonStyles.buttonoogle} onPress={google}>
					<Animated.Image
						source={{
							uri: 'https://cdn-icons-png.flaticon.com/512/300/300221.png',
						}}
						style={{ height: 18, width: 18 }}
						resizeMode="cover"
					/>
					<Text style={FontSizeWithColors['opensans-500-14-grey-535353']}>
						Continue with Google
					</Text>
				</RectButton>
				{isAndroid ? null : (
					<RectButton style={commonStyles.buttonApple} onPress={apple}>
						<FontAwesome name="apple" size={16} color="#fff" />
						<Text style={FontSizeWithColors['opensans-400-14-white']}>
							Continue with Apple
						</Text>
					</RectButton>
				)}
				<RectButton style={commonStyles.buttonem} onPress={facebook}>
					<FontAwesome5 name="facebook-f" size={16} color="#fff" />
					<Text style={FontSizeWithColors['opensans-400-14-white']}>
						Continue with Facebook
					</Text>
				</RectButton>

				<RectButton style={commonStyles.buttonph} onPress={email}>
					<MaterialIcons name="email" size={16} color="white" />
					<Text style={FontSizeWithColors['opensans-400-14-white']}>
						Continue With Email id
					</Text>
				</RectButton>

				<RectButton style={commonStyles.buttonfb} onPress={phone}>
					<FontAwesome name="phone" size={16} color="#fff" />
					<Text style={FontSizeWithColors['opensans-400-14-white']}>
						Continue With Phone number
					</Text>
				</RectButton>
				{authType === 'signin' ? (
					<View style={commonStyles.alway}>
						<Text style={commonStyles.smText}>Already have an account? </Text>
						<RectButton onPress={redirect}>
							<Text style={commonStyles.smTextl}>Sign In</Text>
						</RectButton>
					</View>
				) : (
					<View style={commonStyles.alway}>
						<Text style={commonStyles.smText}>Don't have an account? </Text>
						<RectButton onPress={redirect}>
							<Text style={commonStyles.smTextl}>Sign Up</Text>
						</RectButton>
					</View>
				)}
			</View>
		</GestureHandlerRootView>
	</ScrollView>
);

export default AuthLayout;
