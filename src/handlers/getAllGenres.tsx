import { URL_TO_FETCH_ALL_GENRES } from '@/constants/linksToFetch'

export const getAllGenres = async (type: string) => {
	let genres
	const getGenres = async (type: string) => {
		const response = await fetch(
			URL_TO_FETCH_ALL_GENRES.replace(`{queryParam}`, type)
		)
		const result = await response.json()
		return result.genres
	}

	switch (type) {
		case 'movie':
			genres = await getGenres('movie')
			return genres
		case 'tv':
			genres = await getGenres('tv')
			return genres
		case 'all':
			const movieGenres = await getGenres('movie')
			const tvGenres = await getGenres('tv')
			const mergedGenres = [...new Set([...movieGenres, ...tvGenres])]
			return mergedGenres.map((genre: any) =>
				JSON.parse(JSON.stringify(genre))
			)
	}
}
