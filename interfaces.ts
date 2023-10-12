export interface IGenre {
	id: number
	name: string
}

export interface IBackdrop {
	file_path: string
}

export interface IPersonImage {
	file_path: string
}

export interface IReviewCard {
	author: string
	id: string
	content: string
	created_at: string
	avatar_path: string
}

export interface IReviewCardFromDB {
	id: string
	content: string
	created_at: string
	authorId: string
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

export interface IMovieCard {
	id: number
	poster_path: string
	release_date: string
	title: string
	genres?: Array<IGenre>
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
