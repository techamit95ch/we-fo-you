import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
	MatchActionArgs,
	MatchActionResponse,
	MatchListResponse,
	MatchRequestArgs,
} from '../types';
import { UserStateType } from '../types/userType';
import { BASE_URL } from '../url';

const baseUserApi = createApi({
	reducerPath: 'matchesApi',
	tagTypes: ['getMatches', 'getMatchesByAgeGender', 'swipeRight', 'swipeLeft', 'swipeRightAgain'],
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

export const matchesApi = baseUserApi.injectEndpoints({
	endpoints: (builder) => ({
		getMatches: builder.query<MatchListResponse, {}>({
			query: () => `/matching`,
		}),
		getMatchesByAgeGender: builder.query<MatchListResponse, MatchRequestArgs>({
			query: (params) => ({ url: `/matching`, params, method: 'GET' }),
		}),
		swipeRight: builder.mutation<MatchActionResponse, MatchActionArgs>({
			query: (body) => ({ url: `/matching/right`, body, method: 'POST' }),
		}),
		swipeLeft: builder.mutation<MatchActionResponse, MatchActionArgs>({
			query: (body) => ({ url: `/matching/left`, body, method: 'POST' }),
		}),
		swipeRightAgain: builder.mutation<MatchActionResponse, MatchActionArgs>({
			query: (body) => ({ url: `/matching/right`, body, method: 'PUT' }),
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetMatchesByAgeGenderQuery,
	useGetMatchesQuery,
	useLazyGetMatchesByAgeGenderQuery,
	useLazyGetMatchesQuery,
	useSwipeLeftMutation,
	useSwipeRightAgainMutation,
	useSwipeRightMutation,
} = matchesApi;
