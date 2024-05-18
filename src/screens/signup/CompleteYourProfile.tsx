import { useCallback, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shallowEqual } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTempDOB, setTempName } from '@/store/slices';
import { commonStyles } from '@/component/styles';

// Define the navigation param list type
type StackParamList = {
	Selectgender: undefined; // Add more screen names and parameters as needed
};

// Define the navigation prop type
type CompleteYourProfileProps = {
	navigation: StackNavigationProp<StackParamList, 'Selectgender'>;
};

const CompleteYourProfile = ({ navigation }: CompleteYourProfileProps) => {
	const dispatch = useAppDispatch();

	const [open, setOpen] = useState(false);

	const [email, name, dob] = useAppSelector(
		(state) => [state?.tempUser?.email, state?.tempUser?.name, state?.tempUser?.dob],
		shallowEqual
	);

	const handleGetStartedPress = () => {
		// You can add validation logic for the fields here
		if (name && dob && email) {
			// Navigate to the GenderSelectionScreen (Selectgender)
			navigation.navigate('Selectgender');
		} else {
			/* empty */
			navigation.navigate('Selectgender');
		}
	};

	const handleDateChange = useCallback(
		(date: Date) => {
			dispatch(setTempDOB(date?.toDateString()));
			setOpen(false);
		},
		[dispatch]
	);

	return (
		<SafeAreaView style={commonStyles.container}>
			<Text style={commonStyles.description}>We’re so glad you’re here!</Text>
			<Text style={commonStyles.Subdescription}>
				Create your over account so that you can enjoy the experience of the application
			</Text>
			<ScrollView>
				{/* Main Text */}

				{/* Text Input for Name */}
				<TextInput
					style={commonStyles.input}
					placeholder="Full Name"
					value={name}
					onChangeText={(text) => dispatch(setTempName(text))}
				/>

				<TouchableOpacity
					style={[commonStyles.input, { justifyContent: 'center' }]}
					onPress={() => setOpen(true)}
				>
					<Text>
						{dob ? new Date(dob)?.toDateString() : 'Date of Birth (MM/DD/YYYY)'}
					</Text>
				</TouchableOpacity>
				<DatePicker
					style={{ width: 300 }}
					// date={new Date(dob)}
					date={dob ? new Date(dob) : new Date()}
					modal={true}
					mode="date"
					open={open}
					placeholder="Date of Birth (YYYY-MM-DD)"
					format="YYYY-MM-DD"
					minDate="1900-01-01"
					maxDate={new Date().toISOString().split('T')[0]}
					confirmBtnText="Confirm"
					cancelBtnText="Cancel"
					textColor="#F44586"
					customStyles={{
						dateIcon: {
							position: 'absolute',
							left: 0,
							top: 4,
							marginLeft: 0,
						},
						dateInput: {
							marginLeft: 36,
						},
						backgroundColor: '#F44586',
					}}
					onConfirm={handleDateChange}
					androidVariant="iosClone"
					onCancel={() => setOpen(false)}
				/>

				<TextInput
					style={[commonStyles.input, { backgroundColor: 'rgba(0,0,0,0.2)' }]}
					placeholder="Email"
					value={email}
					editable={false}
				/>

				<RectButton onPress={handleGetStartedPress} style={commonStyles.button}>
					<Text style={commonStyles.buttonText}>Continue</Text>
				</RectButton>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CompleteYourProfile;
