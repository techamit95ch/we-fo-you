// import { MMKV } from 'react-native-mmkv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Storage } from 'redux-persist';
export const storage = AsyncStorage;

export const reduxStorage: Storage = {
	setItem: async (key, value) => {
		storage.setItem(key, value);

		return Promise.resolve(true);
	},
	getItem: async (key) => {
		const value = storage.getItem(key);

		return Promise.resolve(value);
	},
	removeItem: async (key) => {
		storage.removeItem(key);

		return Promise.resolve();
	},
};
