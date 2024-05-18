import { createAsyncThunk, createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Location from 'expo-location';

import { InterestType, UserStateType } from '../types';
import { AppDispatch, RootState } from '..';

import { GEO_API_KEY } from '@/constants/env';

const createAsyncThunkWithReject = <Returned, ThunkArg>(
	typePrefix: string,
	asyncFunction: (arg: ThunkArg) => Promise<Returned>
) =>
	createAsyncThunk<Returned, ThunkArg, { dispatch: AppDispatch; state: RootState }>(
		typePrefix,
		async (arg: ThunkArg, { rejectWithValue }) => {
			try {
				return await asyncFunction(arg);
			} catch (error) {
				return rejectWithValue((error as Error)?.message);
			}
		}
	);

const setFieldReducer =
	<T extends keyof UserStateType>(fieldName: T) =>
	(state: UserStateType, action: PayloadAction<UserStateType[T]>) => {
		state[fieldName] = action.payload;
	};

const initialState: UserStateType = { interests: [] };

const reverseGeocode = async (latitude: number, longitude: number) => {
	const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${GEO_API_KEY}&q=${latitude}+${longitude}&pretty=1`;

	const { data } = await axios.get(apiUrl);

	if (data.results.length > 0) {
		const result = data?.results?.[0];

		const location = result.formatted?.toString() as string;

		const city = (result.components.city?.toString() ||
			result.components.town?.toString()) as string;

		// return `Location: ${location}, City: ${city}`;
		return { location, city };
	} else {
		return undefined;
	}
};

// Async action for getting user location
export const getLocation = createAsyncThunkWithReject('user/getLocation', async () => {
	const { status } = await Location.requestForegroundPermissionsAsync();

	if (status !== 'granted') {
		throw new Error('Permission to access location was denied');
	}

	const { coords } = await Location.getCurrentPositionAsync({});

	const data = await reverseGeocode(coords.latitude, coords?.longitude);

	return { ...coords, ...data };
});

// Main user slice
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserStateType>) => ({
			...state,
			...action.payload,
		}),
		setInterests: (state, action: PayloadAction<UserStateType['interests']>) => {
			state.interests = action.payload;
		},
		setEmail: setFieldReducer('email'),
		setName: setFieldReducer('name'),
		setDOB: setFieldReducer('dob'),
		setGender: setFieldReducer('gender'),
		setPassword: setFieldReducer('password'),
		setPreference: setFieldReducer('preference'),
		setToken: setFieldReducer('token'),
		setInterest: (state, action: PayloadAction<InterestType>) => {
			const index =
				state?.interests?.findIndex((item) => item._id === action.payload?._id) || -1;

			if (index === -1) {
				state?.interests?.push(action.payload);
			} else {
				state?.interests?.splice(index, 1);
			}
		},
		removeUser: () => ({
			interests: [],
		}),
	},
	extraReducers(builder) {
		builder.addCase(getLocation.pending, () => {
			console.log('pending');
		});
		builder.addCase(getLocation.fulfilled, (state, { payload }) => {
			const { location, city, ...coords } = payload;

			state.location = location;
			state.city = city;
			state.cords = coords;
			state.coordinates = [coords?.longitude || 0, coords?.latitude || 0];
		});
		builder.addCase(getLocation.rejected, (_, { error }) => {
			console.error('Error in getLocation:', error);
		});
	},
});

// Selectors
export const getUser = (state: RootState) => state.user;
export const getInterests = (state: RootState) => state.user.interests;

// Export actions and reducer
export const {
	setUser,
	removeUser,
	setEmail,
	setDOB,
	setName,
	setInterests,
	setInterest,
	setGender,
	setPassword,
	setPreference,
	setToken,
} = userSlice.actions;

const userReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setUser, (state, action: PayloadAction<UserStateType>) => ({
			...state,
			...action.payload,
		}))
		.addCase(setInterests, (state, action: PayloadAction<UserStateType['interests']>) => {
			state.interests = action.payload;
		})
		.addCase(setEmail, setFieldReducer('email'))
		.addCase(setName, setFieldReducer('name'))
		.addCase(setDOB, setFieldReducer('dob'))
		.addCase(setToken, setFieldReducer('token'))
		.addCase(setGender, setFieldReducer('gender'))
		.addCase(setPassword, setFieldReducer('password'))
		.addCase(setPreference, setFieldReducer('preference'))
		.addCase(setInterest, (state, action: PayloadAction<InterestType>) => {
			const index =
				state?.interests?.findIndex((item) => item._id === action.payload?._id) || -1;

			if (index === -1) {
				state?.interests?.push(action.payload);
			} else {
				state?.interests?.splice(index, 1);
			}
		})
		.addCase(removeUser, () => ({
			interests: [],
		}))
		.addCase(getLocation.fulfilled, (state, { payload }) => {
			const { location, city, ...coords } = payload;

			state.location = location;
			state.city = city;
			state.cords = coords;
			state.coordinates = [coords?.longitude || 0, coords?.latitude || 0];
		});
});

export default userReducer;
