import { IReviewItemCard } from '../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import { ref, set } from 'firebase/database'
import { database } from '@/firebase/config'

export const createReviewOrReply = async (
	userId: string,
	itemConfig: {
		newItem: IReviewItemCard
		reviewedItemId: number
		collectionType: UserCollections.reviews | UserCollections.replies
		reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
	}
) => {
	const {
		newItem,
		reviewedItemId,
		collectionType,
		reviewedItemCollectionType,
	} = itemConfig
	const collectionPathForReviewOrReply = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${newItem.id}`
	const generalCollectionPathForReviewOrReply = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${newItem.id}`
	const collectionRefForReviewOrReply = ref(
		database,
		collectionPathForReviewOrReply
	)
	const generalCollectionRefForReviewOrReply = ref(
		database,
		generalCollectionPathForReviewOrReply
	)

	await set(collectionRefForReviewOrReply, newItem)
	await set(generalCollectionRefForReviewOrReply, newItem)
}
