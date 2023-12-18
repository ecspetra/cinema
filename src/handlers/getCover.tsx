import { fetchItemData } from '@/handlers/fetchItemData'

export const getCover = async (itemId: number, collectionType: string) => {
	const result = await fetchItemData(collectionType, itemId, '')
	return result.poster_path || result.profile_path
}
