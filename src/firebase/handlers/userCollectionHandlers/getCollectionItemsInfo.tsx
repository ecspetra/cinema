import { fetchItemData } from '@/handlers/fetchItemData'
import { createItemCard } from '@/handlers/createItemCard'
import { child, DatabaseReference, get } from 'firebase/database'
import { getCollectionMarksList } from '@/firebase/handlers/userCollectionHandlers/getCollectionMarksList'
import { UserCollections } from '@/constants/enum'

type CollectionInfo = {
	type:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
		| UserCollections.reviews
		| UserCollections.replies
		| UserCollections.marks
	ref: DatabaseReference
	userId: string
}

export const getCollectionItemsInfo = async (
	itemIds: string[],
	collectionInfo: CollectionInfo
) => {
	const collectionType = collectionInfo.type

	try {
		switch (collectionType) {
			case 'movie':
			case 'tv':
			case 'person':
				const itemsInfo = await Promise.all(
					itemIds.map(async itemId => {
						const itemInfo = await fetchItemData(
							collectionInfo.type,
							itemId,
							''
						)
						return itemInfo
					})
				)
				const items = createItemCard(itemsInfo)
				return items
			case 'reviews':
			case 'replies':
				return await Promise.all(
					itemIds.map(async itemId => {
						const itemSnapshot = await get(
							child(collectionInfo.ref, itemId)
						)
						return itemSnapshot.val()
					})
				)
			case 'marks':
				return await getCollectionMarksList(collectionInfo.userId)
		}
	} catch (error) {
		throw error
	}
}
