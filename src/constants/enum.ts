export enum SortByOption {
	'Popularity: Low to hight' = 'popularity.asc',
	'Popularity: Hight to low' = 'popularity.desc',
	'Revenue: Low to hight' = 'revenue.asc',
	'Revenue: : Hight to low' = 'revenue.desc',
	'Release year: Low to hight' = 'primary_release_year.asc',
	'Release year: : Hight to low' = 'primary_release_year.desc',
	'Vote average: Low to hight' = 'vote_average.asc',
	'Vote average: : Hight to low' = 'vote_average.desc',
	'Vote count: Low to hight' = 'vote_count.asc',
	'Vote count: : Hight to low' = 'vote_count.desc',
}

export enum FilterFields {
	searchQuery = 'search',
	primary_release_year = 'year',
	first_air_date_year = 'first air date',
	include_adult = 'adult',
	vote_average = 'vote average',
	with_people = 'person',
	with_companies = 'company',
	with_genres = 'genres',
	with_origin_country = 'country',
	with_keywords = 'keyword',
}
