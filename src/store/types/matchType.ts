import { Gender } from './userType';

export type MatchListResponse = {
	list?: MatchListType[];
	totalpage?: number;
};

export type MatchRequestArgs = {
	age?: number;
	page?: number;
	limit?: number;
	gender?: Gender;
};

export type MatchActionResponse = {
	success?: boolean;
	mathed?: boolean;
	partnerId?: string;
	messages?: string;
};

export type MatchActionArgs = {
	to?: string;
	from?: string;
};

export type MatchListType = {
	interest?: string[];
	_id?: string;
	email?: string;
	dob?: string;
	bio?: string;
	gender?: string;
	name?: string;
	location?: string;
	avatar?: string;
	distance?: string;
	city?: string;
	job?: string;
	locationCoordinates?: number[];
	preference?: string[];
	galary?: string[];
	__v?: number;
};
