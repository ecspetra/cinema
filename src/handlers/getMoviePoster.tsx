import { fetchMovieData } from '@/handlers/fetchMovieData'

export const getMoviePoster = async (movieId: number) => {
	const result = await fetchMovieData(movieId, '')
	return result.poster_path
}
