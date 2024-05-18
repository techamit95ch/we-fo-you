import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import { PersistConfig } from 'redux-persist/es/types';

import tempUserSliceReducer from './slices/tempUser';
import userReducer from './slices/userSlice';
import { matchesApi, messageApi, uploadApi, userApi } from './apis';
import { appSliceReducer } from './slices';
import { reduxStorage } from './storage';

const rootReducer = combineReducers({
	tempUser: tempUserSliceReducer,
	user: userReducer,
	app: appSliceReducer,
	[userApi.reducerPath]: userApi.reducer,
	[matchesApi.reducerPath]: matchesApi.reducer,
	[uploadApi.reducerPath]: uploadApi.reducer,
	[messageApi.reducerPath]: messageApi.reducer,
	// ...other reducers
	// ...api reducer from RTK Query
});

const persistConfig: PersistConfig<RootState> = {
	key: 'root',
	version: 1,
	storage: reduxStorage,
	whitelist: ['app', 'onboarding', 'user'],
};

const persistedReducer = persistReducer<RootState, Action>(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		const middlewares = getDefaultMiddleware({
			serializableCheck: false,
		}).concat(
			userApi.middleware,
			matchesApi.middleware,
			uploadApi.middleware,
			messageApi.middleware
		);

		// if (__DEV__) {
		// 	const createDebugger = require('redux-flipper').default;

		// 	middlewares.push(createDebugger());
		// }

		return middlewares;
	},
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
