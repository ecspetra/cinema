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
	searchQuery = 'Search',
	primary_release_year = 'Year',
	first_air_date_year = 'First air date',
	include_adult = 'Adult',
	vote_average = 'Vote average',
	with_people = 'Person',
	with_companies = 'Company',
	with_genres = 'Genres',
	with_origin_country = 'Country',
	with_keywords = 'Keyword',
}
