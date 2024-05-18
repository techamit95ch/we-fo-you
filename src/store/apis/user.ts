import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
	InterestResponseType,
	UserPostRequestType,
	UserResponseType,
	UserSocialLogin,
	UserSocialPostRequestType,
	UserStateType,
} from '../types/userType';
import { BASE_URL } from '../url';

const baseUserApi = createApi({
	reducerPath: 'interestApi',
	tagTypes: [
		'getInterests',
		'saveuser',
		'login',
		'socialSignUp',
		'sociallogin',
		'updateUser',
		'getUser',
		'saveUserAlbum',
	],
	baseQuery: fetchBaseQuery({
		baseUrl: `${BASE_URL}`,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as UserStateType)?.token;

			if (token) headers.set('Authorization', `Bearer ${token}`);

			return headers;
		},
	}),
	endpoints: () => ({}),
});

export const userApi = baseUserApi.injectEndpoints({
	endpoints: (builder) => ({
		getInterests: builder.query<InterestResponseType, {}>({
			query: () => `/user/interest`,
		}),
		login: builder.mutation<InterestResponseType, { email?: string; password?: string }>({
			query: (body) => ({ url: `/user/login`, body, method: 'PUT' }),
			invalidatesTags: ['login'],
		}),
		saveuser: builder.mutation<UserResponseType, UserPostRequestType>({
			query: (body) => ({ url: `/user`, body, method: 'POST' }),
			invalidatesTags: ['saveuser'],
		}),
		socialSignUp: builder.mutation<
			UserResponseType,
			UserSocialPostRequestType & UserSocialPostRequestType
		>({
			query: (body) => ({ url: `/user/socialregister`, body, method: 'PUT' }),
			invalidatesTags: ['saveuser'],
		}),
		sociallogin: builder.mutation<UserResponseType, UserSocialLogin>({
			query: (body) => ({ url: `/user/sociallogin`, body, method: 'PUT' }),
			invalidatesTags: ['sociallogin'],
		}),
		updateUser: builder.mutation<UserResponseType, UserSocialPostRequestType>({
			query: (body) => ({ url: `/user/`, body, method: 'PUT' }),
			invalidatesTags: ['saveuser'],
		}),
		getUser: builder.query<UserResponseType, { userId: string }>({
			query: (params) => ({ url: `/user/`, params, method: 'GET' }),
		}),
		saveUserAlbum: builder.mutation<
			UserResponseType,
			{
				userId: string;
				link: string;
			}
		>({
			query: (data) => ({ url: `/user/album`, data, method: 'PUT' }),
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetInterestsQuery,
	useLazyGetInterestsQuery,
	usePrefetch,
	useSaveuserMutation,
	useSaveUserAlbumMutation,
	useSocialSignUpMutation,
	useLoginMutation,
	useGetUserQuery,
	useUpdateUserMutation,
	useSocialloginMutation,
} = userApi;
