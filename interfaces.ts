export interface ITag {
	id: number
	name: string
}

export interface IBackdrop {
	file_path: string
}

export interface IPersonImage {
	file_path: string
}

export interface IMarkFromDB {
	key: string
	data: {
		movieMark: IMark
		userId: string
	}
}

export interface IMark {
	mark: number
	movieId: number
	isTVShow: boolean
}

export interface IReviewCard {
	author: string
	id: string
	content: string
	created_at: string
	avatar_path: string
}

export interface IReviewCardFromDB {
	movieId: number
	id: string
	content: string
	created_at: string
	authorId: string
	isTVShow: boolean
}

export interface IReplyCard {
	movieId: number
	replyTo: string
	reviewId: string
	id: string
	content: string
	created_at: string
	authorId: string
	isTVShow: boolean
}

export interface IMovieInfo {
	id: number
	poster_path: string
	title: string
	tagline: string
	genres: Array<IGenre>
	release_date: string
	production_countries: Array<object>
	production_companies: Array<object>
	overview: string
	vote_average: number
	vote_count: number
	adult?: boolean
}

export interface ITVShowInfo {
	id: number
	poster_path: string
	name: string
	tagline: string
	genres: Array<IGenre>
	first_air_date: string
	production_countries: Array<object>
	production_companies: Array<object>
	overview: string
	vote_average: number
	vote_count: number
	seasons: Array<ITVSeasonCard>
	adult?: boolean
}

export interface IMovieCard {
	id: number
	poster_path: string
	release_date: string
	title: string
	genres?: Array<IGenre>
}

export interface ITVShowCard {
	id: number
	poster_path: string
	first_air_date: string
	name: string
	genres?: Array<IGenre>
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

export interface IPersonCard {
	id: number
	gender: number
	profile_path: string
	name: string
	known_for_department: string
	character?: string
	job?: string
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
	modalTitle: string
	modalText: string
	modalClassName: string
	modalContent: JSX.Element | null
	alertInfo: {
		isAlert: boolean
		type: 'success' | 'error' | ''
	} | null
}
