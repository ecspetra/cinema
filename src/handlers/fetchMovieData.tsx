import { LINK_TO_FETCH_MOVIE_DATA } from '@/constants/linksToFetch'

export const fetchMovieData = async (
	listName: string,
	itemId: number,
	queryParam: string
) => {
	const linkToFetch = LINK_TO_FETCH_MOVIE_DATA.replace('{listName}', listName)
		.replace('{itemId}', itemId)
		.replace('{queryParam}', queryParam)

	const response = await fetch(linkToFetch)
	return await response.json()
}
