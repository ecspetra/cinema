import { fetchItemData } from '@/handlers/fetchItemData'

export const getMoviePoster = async (movieId: number, isTVShow: boolean) => {
	const result = await fetchItemData(isTVShow ? 'tv' : 'movie', movieId, '')
	return result.poster_path
}
