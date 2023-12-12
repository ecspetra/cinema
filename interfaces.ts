import { UserCollectionType } from '@/firebase/config'

export interface IFetchedResult<T> {
	isMoreDataAvailable: boolean
	items: T[]
}

export interface ITag {
	id: number
	name: string
}

export interface IBackdrop {
	file_path: string
}

export interface IVideoData {
	type: string
	site: string
}

export interface IPersonImage {
	file_path: string
}

export interface IMarkFromDB {
	key: string
	data: {
		itemMark: IMark
		userId: string
	}
}

export interface IMark {
	mark: number
	itemId: number
	type: Extract<UserCollectionType, 'movie' | 'tv'>
}

export interface IReviewCard {
	id: string
	content: string
	created_at: string
	author?: string
	avatar_path?: string
	movieId?: number
	authorId?: string
	isTVShow?: boolean
	replyTo?: string
	reviewId?: string
}

export interface IItemCard {
	id: number
	media_type?: string
	gender?: number
	poster_path?: string
	profile_path?: string
	release_date?: string
	first_air_date?: string
	title?: string
	name?: string
	genres?: Array<ITag>
	genre_ids?: Array<number>
	known_for_department?: string
	character?: string
	job?: string
}

export interface IUpcomingMovieItem {
	id: number
	release_date?: string
	title?: string
	genres?: Array<ITag>
}

export interface ITVSeasonCard {
	id: number
	name: string
	episode_count: number
	overview: string
	air_date: string
	poster_path: string
	vote_average: number
}

export interface IMovieInfo {
	id: number
	poster_path: string
	title: string
	tagline: string
	genres: Array<ITag>
	release_date: string
	production_countries: Array<object>
	production_companies: Array<object>
	overview: string
	vote_average: number
	vote_count: number
}

export interface ITVShowInfo {
	id: number
	poster_path: string
	name: string
	tagline: string
	genres: Array<ITag>
	first_air_date: string
	production_countries: Array<object>
	production_companies: Array<object>
	overview: string
	vote_average: number
	vote_count: number
	seasons: Array<ITVSeasonCard>
}

export interface IPersonInfo {
	id: number
	profile_path: string
	known_for_department: string
	name: string
	place_of_birth: string
	gender: number
	birthday: string
	deathday: string | null
	biography: string
}

export interface IModalContent {
	id: string
	modalTitle?: string
	modalText?: string
	modalClassName?: string
	modalContent?: JSX.Element | null
	alertInfo?: {
		isAlert: boolean
		type: 'success' | 'error'
	} | null
}

export interface ICountry {
	iso_3166_1: string
	english_name: string
	native_name: string
}

export interface IDefaultImage {
	src: string
}

export interface IUser {
	id: string
	displayName: string
	email: string
	photoURL: string
	favoriteGenres?: ITag[]
}

export interface IFriendInfo {
	friends: string
	info: IUser
	reviews: IReviewCard[]
}
