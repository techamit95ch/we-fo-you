import { LocationObjectCoords } from 'expo-location';

export type DeepPartial<T> = T extends (...args: infer A) => infer R
	? (...args: DeepPartial<A>) => DeepPartial<R>
	: T extends Array<infer U>
		? DeepPartial<U>[]
		: T extends object
			? {
					[K in keyof T]?: DeepPartial<T[K]>;
				}
			: T;

export const enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export const enum Preference {
	Male = 'male',
	Female = 'female',
	Both = 'both',
}

export type InterestType<T = string> = DeepPartial<{ _id?: string; name?: T }>;

export type InterestResponseType<T = string> = DeepPartial<InterestType<T>>[];

export type UserPostRequestType = DeepPartial<{
	name: string;
	dob: string;
	email: string;
	password: string;
	bio: string;
	mobile: string;
	gender: Gender;
	coordinates: number[];
	location: string;
	city?: string;
	locationCoordinates: number[];
	preference: Preference;
	cords: LocationObjectCoords;
}>;

export type UserSocialPostRequestType = DeepPartial<{
	name: string;
	dob: string;
	email: string;
	password: string;
	bio: string;
	mobile: string;
	gender: Gender;
	coordinates: number[];
	location: string;
	city?: string;

	locationCoordinates: number[];
	preference: Preference;
	cords: LocationObjectCoords;
	avatar: string;
	loginType: 'google' | 'facebook';
	token: string;
	interest: string[];
}>;

export type UserSocialLogin = {
	loginType?: 'facebook' | 'google' | 'apple';
	token?: string;
	email?: string;
	phone?: string;
	otp?: string;
};

export type UserResponseType = DeepPartial<{
	name: string;
	dob: string;
	email: string;
	password: string;
	bio: string;
	mobile: string;
	gender: Gender;
	coordinates: number[];
	location: string;
	city?: string;

	locationCoordinates: number[];
	preference: Preference;
	cords: LocationObjectCoords;
	avatar: string;
	loginType: 'google' | 'facebook';
	token: string;
	interest: string[];
	_id: string;
	__v: number;
}>;

export type UserStateType = DeepPartial<{
	isLogggedIn?: boolean;
	name?: string;
	avatar?: string;
	gender?: Gender;
	location?: string;
	city?: string;
	age?: string;
	dob?: string;
	photos?: string[];
	interests?: InterestResponseType;
	interest?: string[];
	token?: string;
	_id?: string;
	userId?: string;
	email?: string;
	password?: string;
	bio?: string;
	mobile?: string;
	coordinates?: number[];
	locationCoordinates?: number[];
	preference: Preference;
	cords: LocationObjectCoords;
}>;

export type TempUserSocialStateType = DeepPartial<{
	isLogggedIn?: boolean;
	name?: string;
	avatar?: string;
	gender?: Gender;
	location?: string;
	city?: string;
	age?: string;
	dob?: string;
	photos?: string[];
	interests?: InterestResponseType;
	token?: string;
	_id?: string;
	userId?: string;
	email?: string;
	password?: string;
	bio?: string;
	mobile?: string;
	coordinates?: number[];
	locationCoordinates?: number[];
	preference: Preference;
	cords: LocationObjectCoords;
}>;

export type SliceType = Record<'user', UserStateType>;
