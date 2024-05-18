import { createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InterestType, UserStateType } from '../types';

const initialTempState: UserStateType = { interests: [] };

// const tempUserReducer = createReducer(initialTempState, (builder) => {
// 	builder.addCase('initialTempState/setTempUser', (state, action) => {
// 		state = { ...state, ...action?.payload };
// 	});
// });

const tempUserSlice = createSlice({
	name: 'tempUser',
	initialState: initialTempState,
	reducers: {
		setTempUser: (state: UserStateType, action: PayloadAction<UserStateType>) => {
			state = { ...state, ...action?.payload };
		},
		setTempInterests: (
			state: UserStateType,
			action: PayloadAction<UserStateType['interests']>
		) => {
			state.interests = action?.payload;
			state.interest = action?.payload?.map((item) => item?._id || '');
		},
		setTempEmail: (state: UserStateType, action: PayloadAction<UserStateType['email']>) => {
			state.email = action?.payload;
		},
		setTempName: (state: UserStateType, action: PayloadAction<UserStateType['name']>) => {
			state.name = action?.payload;
		},
		setTempDOB: (state: UserStateType, action: PayloadAction<UserStateType['dob']>) => {
			state.dob = action?.payload;
		},
		setTempGender: (state: UserStateType, action: PayloadAction<UserStateType['gender']>) => {
			state.gender = action?.payload;
		},
		setTempPassword: (
			state: UserStateType,
			action: PayloadAction<UserStateType['password']>
		) => {
			state.password = action?.payload;
		},

		setTempPreference: (
			state: UserStateType,
			action: PayloadAction<UserStateType['preference']>
		) => {
			state.preference = action?.payload;
		},
		setTempInterest: (state: UserStateType, action: PayloadAction<InterestType>) => {
			if (state.interests?.length === 0) {
				state.interests = [action.payload];

				return;
			}
			const index = state.interests?.findIndex((item) => item._id === action.payload?._id);

			if (index === -1) {
				state.interests = [...(state.interests || []), action.payload];

				return;
			}
			state.interests = state.interests?.filter((item) => item?._id !== action?.payload?._id);
		},

		removeTempUser: () => {
			return {};
		},
	},
	extraReducers(builder) {},
});

export const getTempUser = (state: UserStateType) => {
	return state;
};
export const getTempInterests = (state: UserStateType) => {
	return state.interests;
};

export const {
	setTempUser,
	removeTempUser,
	setTempEmail,
	setTempDOB,
	setTempName,
	setTempInterests,
	setTempInterest,
	setTempGender,
	setTempPassword,
	setTempPreference,
} = tempUserSlice.actions;

const tempUserSliceReducer = createReducer(initialTempState, (builder) => {
	builder
		.addCase(setTempUser, (state: UserStateType, action: PayloadAction<UserStateType>) => {
			const newData = { ...state, ...action?.payload };

			console.log({ newData });

			state = newData;
		})
		.addCase(
			setTempEmail,
			(state: UserStateType, action: PayloadAction<UserStateType['email']>) => {
				state.email = action.payload;
			}
		)
		.addCase(
			setTempDOB,
			(state: UserStateType, action: PayloadAction<UserStateType['dob']>) => {
				state.dob = action.payload;
			}
		)
		.addCase(
			setTempName,
			(state: UserStateType, action: PayloadAction<UserStateType['name']>) => {
				state.name = action.payload;
			}
		)
		.addCase(
			setTempGender,
			(state: UserStateType, action: PayloadAction<UserStateType['gender']>) => {
				state.gender = action.payload;
			}
		)
		.addCase(
			setTempPreference,
			(state: UserStateType, action: PayloadAction<UserStateType['preference']>) => {
				state.preference = action.payload;
			}
		)
		.addCase(setTempInterest, (state: UserStateType, action: PayloadAction<InterestType>) => {
			if (state.interests?.length === 0) {
				state.interests = [action.payload];

				return;
			}
			const index = state.interests?.findIndex((item) => item._id === action.payload?._id);

			if (index === -1) {
				state.interests = [...(state.interests || []), action.payload];

				return;
			}
			state.interests = state.interests?.filter((item) => item?._id !== action?.payload?._id);
		})
		.addCase(removeTempUser, () => {
			return {};
		});
});

export default tempUserSliceReducer;
