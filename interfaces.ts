import { UserCollections } from '@/constants/enum'
import { FilterFormData } from '@/hooks/useFilterReducer'

export interface IFetchedResult<T> {
	isMoreDataAvailable: boolean
	items: T[]
}

export interface ITag {
	id?: number
	name?: string
	field?: keyof FilterFormData
}

export interface IBackdrop {
	file_path: string
}

export interface IVideoData {
	key: string
	type: string
	site: string
}

export interface IPersonImage {
	file_path: string
}

export interface IDetailsTextArrayItemType {
	name: string
}

export interface IDetailsItemText {
	birthday: string
	deathday?: string | null
}

export interface IDetailsItem {
	type: string
	title: string | IDetailsItemText
	text: string | IDetailsItemText | IDetailsTextArrayItemType[]
}

export interface IMarkFromDB {
	key: string
	data: IMark
}

export interface IMark {
	markedItemId: number
	markValue: number
	collectionType: UserCollections.movie | UserCollections.tv
}

export interface IReviewCard {
	id: string
	content: string
	created_at: string
	author?: string
	avatar_path?: string
	reviewedItemId?: number
	authorId?: string
	replyToUser?: string
	reviewId?: string
	reviewedItemCollectionType?: UserCollections.movie | UserCollections.tv
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
	genres?: ITag[]
	genre_ids?: number[]
	known_for_department?: string
	character?: string
	job?: string
}

export interface IUpcomingMovieItem {
	id: number
	release_date?: string
	title?: string
	genres?: ITag[]
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

export interface IMovieOrTVShowBasicInfo {
	id: number
	poster_path: string
	tagline: string
	genres: ITag[]
	production_countries: object[]
	production_companies: object[]
	overview: string
	vote_average: number
	vote_count: number
	release_date?: string
	first_air_date?: string
	title?: string
	name?: string
	seasons?: ITVSeasonCard[]
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

export interface IDefaultImage {
	src: string
}

export interface IGeneralCollection {
	collectionMovies: IItemCard[]
	collectionTVShows: IItemCard[]
	collectionPersons: IItemCard[]
	allCollectionReviews: IReviewCard[]
	collectionMarks: IMark[]
}

export interface IUser {
	id: string
	displayName: string
	email: string
	photoURL: string
	country?: string
	dateOfBirth?: string
	about?: string
	favoriteGenres?: ITag[]
}

export interface IFullUserInfo {
	friends: IFullUserInfo[]
	info: IUser
	collection: IGeneralCollection | null
}

export interface IMovieOrTVShowData {
	basicInfo: IMovieOrTVShowBasicInfo
	credits: { cast: IItemCard[]; crew: IItemCard[] }
	images: IBackdrop[]
	video: IVideoData[]
	reviewsFromAPIAndStorage: IReviewCard[]
	similarItemsList: IFetchedResult<IItemCard>
}

export interface IItemCountry {
	iso_3166_1: string
	english_name: string
	native_name: string
}

export interface IReviewAuthorInfo {
	userId: string
	photoURL: string
	displayName: string
}
