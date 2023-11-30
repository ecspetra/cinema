import { URL_TO_FETCH_ALL_GENRES } from '@/constants/linksToFetch'

const getAllGenres = async (listName: string) => {
	const response = await fetch(
		URL_TO_FETCH_ALL_GENRES.replace(`{queryParam}`, listName)
	)
	const result = await response.json()
	return result.genres
}

export default getAllGenres
