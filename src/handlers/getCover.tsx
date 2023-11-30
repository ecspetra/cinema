import { fetchItemData } from '@/handlers/fetchItemData'

export const getCover = async (itemId: number, type: string) => {
	const result = await fetchItemData(type, itemId, '')
	return result.poster_path || result.profile_path
}
