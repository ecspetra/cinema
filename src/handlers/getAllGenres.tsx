import { URL_TO_FETCH_ALL_GENRES } from '@/constants/linksToFetch'

const getAllGenres = async () => {
	const movieUrl = await fetch(
		URL_TO_FETCH_ALL_GENRES.replace(`{queryParam}`, 'movie')
	)
	const tvUrl = await fetch(
		URL_TO_FETCH_ALL_GENRES.replace(`{queryParam}`, 'tv')
	)
	const movieGenres = await movieUrl.json()
	const tvGenres = await tvUrl.json()

	const allGenres = [...movieGenres.genres, ...tvGenres.genres]
	const result = [...new Set(allGenres)]

	return result
}

export default getAllGenres
