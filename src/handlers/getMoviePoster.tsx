import { API_KEY } from '@/constants/linksToFetch'

export const getMoviePoster = (movieId: number) => {
	return new Promise(async resolve => {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
		)
		const result = await response.json()
		resolve(result.poster_path)
	})
}
