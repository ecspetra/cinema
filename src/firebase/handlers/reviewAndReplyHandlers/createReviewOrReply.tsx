import { IReviewItemCard } from '../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import { ref, set } from 'firebase/database'
import { database } from '@/firebase/config'

export const createReviewOrReply = async (
	item: IReviewItemCard,
	userId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPathForReviewOrReply = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${item.id}`
	const generalCollectionPathForReviewOrReply = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${item.id}`
	const collectionRefForReviewOrReply = ref(
		database,
		collectionPathForReviewOrReply
	)
	const generalCollectionRefForReviewOrReply = ref(
		database,
		generalCollectionPathForReviewOrReply
	)

	await set(collectionRefForReviewOrReply, item)
	await set(generalCollectionRefForReviewOrReply, item)
}
