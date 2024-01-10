import { IReviewItemCard } from '../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import { get, ref, update } from 'firebase/database'
import { database } from '@/firebase/config'

export const updateReviewOrReply = async (
	userId: string,
	itemConfig: {
		item: IReviewItemCard
		reviewedItemId: number
		collectionType: UserCollections.reviews | UserCollections.replies
		reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
	}
) => {
	const { item, reviewedItemId, collectionType, reviewedItemCollectionType } =
		itemConfig
	const itemId = item.id
	const collectionPathForReviewOrReply = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${itemId}`
	const generalCollectionPathForReviewOrReply = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}`
	const collectionRefForReviewOrReply = ref(
		database,
		collectionPathForReviewOrReply
	)
	const generalCollectionRefForReviewOrReply = ref(
		database,
		generalCollectionPathForReviewOrReply
	)
	const snapshot = await get(collectionRefForReviewOrReply)

	if (snapshot.exists()) {
		await update(collectionRefForReviewOrReply, item)
		await update(generalCollectionRefForReviewOrReply, item)
		return true
	} else {
		return false
	}
}
