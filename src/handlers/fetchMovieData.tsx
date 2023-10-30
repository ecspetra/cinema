import { LINK_TO_FETCH_MOVIE } from '@/constants/linksToFetch'

export const fetchMovieData = async (movieId: number, queryParam: string) => {
	const linkToFetch = LINK_TO_FETCH_MOVIE.replace(
		'{movieId}',
		movieId
	).replace('{queryParam}', queryParam)

	const response = await fetch(linkToFetch)
	return await response.json()
}
