import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { UserStateType } from '../types/userType';
import { BASE_URL } from '../url';

const baseUserApi = createApi({
	reducerPath: 'uploadApi',
	tagTypes: ['upload'],
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

export const uploadApi = baseUserApi.injectEndpoints({
	endpoints: (builder) => ({
		upload: builder.mutation<{ data?: { location?: string } }, FormData>({
			query: (body) => ({ url: `/files`, body, method: 'POST' }),
		}),
	}),
	overrideExisting: false,
});

export const { useUploadMutation } = uploadApi;
