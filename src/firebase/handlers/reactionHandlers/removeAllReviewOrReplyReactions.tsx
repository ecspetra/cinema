import { UserCollections } from '@/constants/enum'
import { ref, remove } from 'firebase/database'
import { database } from '@/firebase/config'

export const removeAllReviewOrReplyReactions = (
	userId: string,
	itemId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPathForUserReaction = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${itemId}`
	const generalCollectionPathForUserReaction = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}`

	const collectionRefForUserReaction = ref(
		database,
		collectionPathForUserReaction
	)
	const generalCollectionRefForUserReaction = ref(
		database,
		generalCollectionPathForUserReaction
	)

	return new Promise(async resolve => {
		let isReactionRemovedFromCollection = false

		remove(collectionRefForUserReaction).then(() => {
			remove(generalCollectionRefForUserReaction).then(() => {
				isReactionRemovedFromCollection = true
			})
		})

		resolve(isReactionRemovedFromCollection)
	})
}
