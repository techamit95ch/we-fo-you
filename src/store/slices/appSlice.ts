import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppSliceType } from '../types';

const initialState: AppSliceType = {};

// authenticated?: boolean;
// hasWallet?: boolean;
// fcmToken?: string;
// takeTour?: boolean;
// _hydrate?: boolean;
// skipped?: boolean;

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setOnboarding(state: AppSliceType, action: PayloadAction<AppSliceType['onboarding']>) {
			state.onboarding = action?.payload;
		},
		setAuthenticated(
			state: AppSliceType,
			action: PayloadAction<AppSliceType['authenticated']>
		) {
			state.authenticated = action?.payload;
		},
		setSkipped(state: AppSliceType, action: PayloadAction<AppSliceType['authenticated']>) {
			state.skipped = action?.payload;
		},
	},
	extraReducers(builder) {
		// builder.addCase(register.pending, (state) => {
		// 	state.userData = {
		// 		status: 'loading',
		// 		data: state.userData.data,
		// 	};
		// });
	},
});

export const getAppData = (state: AppSliceType) => {
	return state;
};

export const { setOnboarding, setAuthenticated } = appSlice.actions;
export const appSliceReducer = appSlice.reducer;
export default appSliceReducer;
