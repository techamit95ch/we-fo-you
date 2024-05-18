import { StyleSheet } from 'react-native';

import { FontStyle } from '@/styles';

export const commonStyles = StyleSheet.create({
	Subdescription: {
		color: '#BDBDBD',
		fontSize: 14,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 20,
		marginBottom: 10,
		marginLeft: 0,
		textAlign: 'left',
		...FontStyle['opensans-600'],
	},

	alway: {
		alignItems: 'center',
		color: '#A01124',
		flexDirection: 'row',
		flex: 1,
		fontSize: 16,
		fontWeight: '400',
		justifyContent: 'center',
		textAlign: 'center',
		width: '100%',
		fontFamily: 'OpenSans',
	},

	button: {
		backgroundColor: '#F44586',
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		width: '100%',
		alignItems: 'center',
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOpacity: 0.5,
		shadowRadius: 2,
		shadowOffset: { width: 1, height: 1 },
		elevation: 2,
	},

	buttonText: {
		color: 'white',
		fontSize: 16,
		...FontStyle['opensans-600'],
	},

	buttonem: {
		backgroundColor: '#3975EA',
		borderRadius: 10,
		// marginBottom: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		textAlign: 'left',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 10,
		...FontStyle['opensans-400'],
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOpacity: 0.5,
		shadowRadius: 2,
		shadowOffset: { width: 1, height: 1 },
		elevation: 2,
	},
	buttonoogle: {
		backgroundColor: '#FAFAFA',
		borderRadius: 10,
		// marginBottom: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		textAlign: 'left',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 10,
		...FontStyle['opensans-400'],
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOpacity: 0.5,
		shadowRadius: 2,
		shadowOffset: { width: 1, height: 1 },
		elevation: 2,
	},

	buttonfb: {
		backgroundColor: '#283663',
		borderRadius: 10,
		// marginBottom: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		textAlign: 'left',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 10,
		fontFamily: 'OpenSans',
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOpacity: 0.5,
		shadowRadius: 2,
		shadowOffset: { width: 1, height: 1 },
		elevation: 2,
	},
	buttonApple: {
		backgroundColor: '#1e1e1e',
		borderRadius: 10,
		// marginBottom: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		textAlign: 'left',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 10,
		fontFamily: 'OpenSans',
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOpacity: 0.5,
		shadowRadius: 2,
		shadowOffset: { width: 1, height: 1 },
		elevation: 2,
	},

	buttonph: {
		backgroundColor: '#F44586',
		borderRadius: 10,
		// marginBottom: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		textAlign: 'left',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 10,
		...FontStyle['opensans-500'],
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOpacity: 0.5,
		shadowRadius: 2,
		shadowOffset: { width: 1, height: 1 },
		elevation: 2,
	},

	carousalContainer: {
		flexDirection: 'row',
		width: '100%',
	},

	container: {
		// alignItems: 'flex-start',
		backgroundColor: '#fff',
		flex: 1,
		// justifyContent: 'flex-start',
		paddingHorizontal: 40,
		paddingVertical: 100,
	},

	containerlogin: {
		alignItems: 'center',
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 0,
	},

	description: {
		color: '#1E1E1E',
		fontSize: 34,
		fontStyle: 'normal',
		lineHeight: 40,
		marginBottom: 10,
		marginLeft: 0,
		textAlign: 'left',
		...FontStyle['opensans-600'],
	},

	dropdown: {
		backgroundColor: '#fff',
		borderColor: '#F2F2F2',
		borderRadius: 5,
		borderWidth: 1,
		height: 40,
		marginBottom: 10,
		marginRight: 10,
		paddingHorizontal: 10,
		width: '100%',
	},

	genderButton: {
		alignItems: 'center',
		borderColor: '#F44586',
		borderRadius: 10,
		borderWidth: 1,
		color: '#1E1E1E',
		justifyContent: 'center',
		marginBottom: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		width: '100%',
	},

	genderImage: {
		height: 50,
		width: 50,
	},

	headerText: {
		color: '#1E1E1E',
		fontSize: 16,
		fontStyle: 'normal',
		...FontStyle['opensans-500'],
		// marginBottom: 10,
		// textAlign: 'center',
		width: '100%',
	},

	iconcenter: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		width: '100%',
	},

	image: {
		height: 500,
		width: '100%',
	},

	imageContainer: { backgroundColor: '#fff' },

	input: {
		backgroundColor: '#F2F2F2',
		borderColor: '#F2F2F2',
		borderRadius: 5,
		borderWidth: 1,
		height: 40,
		marginBottom: 10,
		marginRight: 10,
		paddingHorizontal: 10,
		width: '100%',
	},

	inputRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
		width: '100%',
	},

	input_Number: {
		backgroundColor: '#F2F2F2',
		borderColor: '#F2F2F2',
		borderRadius: 5,
		borderWidth: 1,
		height: 40,
		marginBottom: 10,
		marginRight: 10,
		paddingHorizontal: 10,
		width: '80%',
	},

	input_code: {
		backgroundColor: '#F2F2F2',
		borderColor: '#F2F2F2',
		borderRadius: 5,
		borderWidth: 1,
		height: 40,
		marginBottom: 10,
		marginRight: 10,
		paddingHorizontal: 10,
		width: '15%',
	},

	inputcolum: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginBottom: 10,
		width: '100%',
	},

	interestItems: {
		borderColor: '#F44586',
		borderRadius: 5,
		borderWidth: 1,
		color: '#1E1E1E',
		marginBottom: 10,
		paddingHorizontal: 10,
		paddingVertical: 10,
		width: '95%',
	},

	item: {
		alignItems: 'center',
		backgroundColor: '#fff',
		justifyContent: 'center',
		marginVertical: 8,
	},

	label: {
		fontSize: 14,
		fontWeight: 'bold',
		marginTop: 16,
	},

	lcontainer: {
		alignItems: 'flex-start',
		flex: 1,
		justifyContent: 'flex-start',
		padding: 20,
		paddingTop: 37,
		paddingBotttom: 75,
		width: '100%',
		gap: 12,
	},

	loginLabel: {},

	loginimage: {
		flex: 2,
		height: '100%',
		width: '100%',
		borderBottomStartRadius: 40,
		borderBottomEndRadius: 40,
	},

	lsontainer: {
		alignItems: 'center',
		backgroundColor: '#fff',
		justifyContent: 'center',
		marginVertical: 0,
		padding: 15,
	},

	selectedGender: {
		backgroundColor: '#FF5F74',
	},

	selectedGendertext: {
		color: '#f1f1f1',
		fontSize: 16,
		fontWeight: '500',
		textAlign: 'center',
		fontFamily: 'OpenSans',
	},
	gendertext: {
		color: '#A01124',
		fontSize: 16,
		textAlign: 'center',
		...FontStyle['opensans-400'],
	},

	selectedInterest: {
		backgroundColor: '#F44586',
		color: '#ffff',
	},

	slider: {},

	sliderLabel: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 5,
		marginTop: 10,
	},
	smText: {
		color: '#000',
		fontSize: 14,
		fontStyle: 'normal',
		fontWeight: '400',
		fontFamily: 'OpenSans',
	},
	smTextl: {
		color: '#F44586',
		fontSize: 14,
		fontStyle: 'normal',
		fontWeight: '700',
		marginLeft: 0,
		fontFamily: 'OpenSans',
	},

	subtitle: {
		alignItems: 'center',
		color: '#323755',
		fontSize: 14,
		justifyContent: 'center',
		textAlign: 'center',
		fontFamily: 'OpenSans',
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	titleContainer: {
		alignItems: 'center',
		backgroundColor: '#fff',
		bottom: 0,
		justifyContent: 'center',
		padding: 20,
		position: 'absolute',
		width: '100%',
	},

	vmainText: {
		color: '#1E1E1E',
		fontSize: 34,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 40,
		marginBottom: 10,
		marginLeft: 0,
		textAlign: 'center',
		fontFamily: 'OpenSans',

		width: '100%',
	},
	vsubText: {
		color: '#BDBDBD',
		fontSize: 14,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 20,
		marginBottom: 10,
		marginLeft: 0,
		textAlign: 'center',
		width: '100%',
		fontFamily: 'OpenSans',
	},
} as const);

export default commonStyles;
