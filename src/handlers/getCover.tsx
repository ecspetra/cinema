import { fetchItemData } from '@/handlers/fetchItemData'
import { UserCollections } from '@/constants/enum'

export const getCover = async (
	itemId: number,
	collectionType:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
		| UserCollections.reviews
		| UserCollections.replies
		| UserCollections.marks
) => {
	const result = await fetchItemData(collectionType, itemId, '')
	return result.poster_path || result.profile_path
}
