import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io, Socket } from 'socket.io-client';

export interface Message {
	_id: string;
	text: string;
	to: string;
	from: string;
	time: number;
	createdAt: string;
	updatedAt: string;
	__v: 0;
}

export type SendMessageParams = {
	to: string;
	from: string;
	text: string;
	userId: string;
};

// Create a reusable function to handle socket connection and events
const handleSocketEvents = <T extends unknown>(
	socket: Socket,
	eventName: string,
	callback: (data: T) => void
) => {
	socket.on(eventName, (data: T) => {
		callback(data);
	});
};

export const messageApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dev-api.b4you.in' }),
	endpoints: (build) => ({
		getMessages: build.query<Message[], { userId: string }>({
			query: ({ userId }) => ({ url: `/chat`, params: { userId }, method: 'GET' }),
			async onCacheEntryAdded(
				{ userId },
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				const socket = io('https://dev-api.b4you.in', {
					query: { userId },
				});

				handleSocketEvents(socket, 'message', (data: Message) => {
					updateCachedData((draft) => {
						draft.push(data);
					});
				});

				handleSocketEvents(socket, 'connect', async () => {
					await cacheDataLoaded;
				});

				handleSocketEvents(socket, 'disconnect', async () => {
					await cacheEntryRemoved;
				});

				handleSocketEvents<Error>(socket, 'error', (error) => {
					console.error('Socket.IO error:', error);
				});
			},
		}),
		sendMessage: build.mutation<void, SendMessageParams>({
			query: ({ userId }) => ({ url: `/chat`, params: { userId }, method: 'GET' }),
			async onCacheEntryAdded(
				{ userId, from, to, text },
				{ cacheDataLoaded, cacheEntryRemoved }
			) {
				const socket = io('https://dev-api.b4you.in', {
					query: { userId },
				});

				handleSocketEvents(socket, 'connect', async () => {
					await cacheDataLoaded;
				});
				socket.emit('message', { from, to, text });

				handleSocketEvents(socket, 'disconnect', async () => {
					await cacheEntryRemoved;
				});

				handleSocketEvents<Error>(socket, 'error', (error) => {
					console.error('Socket.IO error for sendMessage:', error);
				});
			},
		}),
	}),
});

export const { useGetMessagesQuery, useLazyGetMessagesQuery, useSendMessageMutation } = messageApi;
