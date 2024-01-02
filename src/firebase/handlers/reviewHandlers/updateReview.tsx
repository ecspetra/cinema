import { IReviewCard } from '../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import { get, ref, update } from 'firebase/database'
import { database } from '@/firebase/config'

export const updateReview = async (
	item: IReviewCard,
	userId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const itemId = item.id
	const collectionPath = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${itemId}`
	const generalCollectionPath = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}`
	const itemRef = ref(database, collectionPath)
	const generalItemRef = ref(database, generalCollectionPath)
	const itemSnapshot = await get(itemRef)

	if (itemSnapshot.exists()) {
		await update(itemRef, item)
		await update(generalItemRef, item)
		return true
	} else {
		return false
	}
}
