import { fetchItemData } from '@/handlers/fetchItemData'

export const getMoviePoster = async (movieId: number, type: string) => {
	const result = await fetchItemData(type, movieId, '')
	return result.poster_path
}
