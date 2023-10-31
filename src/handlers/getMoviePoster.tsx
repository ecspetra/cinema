import { fetchMovieData } from '@/handlers/fetchMovieData'

export const getMoviePoster = async (movieId: number, isTVShow: boolean) => {
	const result = await fetchMovieData(isTVShow ? 'tv' : 'movie', movieId, '')
	return result.poster_path
}
