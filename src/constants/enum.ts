import { URL_TO_FETCH_COUNTRIES, URL_TO_SEARCH } from '@/constants/linksToFetch'

export enum SortByOption {
	'Popularity: Low to hight' = 'popularity.asc',
	'Popularity: Hight to low' = 'popularity.desc',
	'Revenue: Low to hight' = 'revenue.asc',
	'Revenue: Hight to low' = 'revenue.desc',
	'Release year: Low to hight' = 'primary_release_year.asc',
	'Release year: Hight to low' = 'primary_release_year.desc',
	'Vote average: Low to hight' = 'vote_average.asc',
	'Vote average: Hight to low' = 'vote_average.desc',
	'Vote count: Low to hight' = 'vote_count.asc',
	'Vote count: Hight to low' = 'vote_count.desc',
}

export enum FilterFields {
	primary_release_year = 'Year',
	first_air_date_year = 'First air date',
	'vote_average.lte' = 'Vote average',
	with_people = 'Person',
	with_companies = 'Company',
	with_genres = 'Genres',
	with_original_language = 'Country',
	with_keywords = 'Keyword',
}

export enum FilterUrlToSearch {
	with_people = URL_TO_SEARCH.replace(
		'{fieldName}',
		FilterFields.with_people.toLowerCase()
	),
	with_companies = URL_TO_SEARCH.replace(
		'{fieldName}',
		FilterFields.with_companies.toLowerCase()
	),
	with_original_language = URL_TO_FETCH_COUNTRIES,
	with_keywords = URL_TO_SEARCH.replace(
		'{fieldName}',
		FilterFields.with_keywords.toLowerCase()
	),
}

export enum UserCollections {
	movie = 'movie',
	tv = 'tv',
	person = 'person',
	reviews = 'reviews',
	replies = 'replies',
	marks = 'marks',
	users = 'users',
	basic = 'basic',
}
