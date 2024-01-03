import { UserCollections } from '@/constants/enum'
import { ref, remove } from 'firebase/database'
import { database } from '@/firebase/config'

export const removeReviewOrReplyReaction = (
	userId: string,
	reviewId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	action: 'like' | 'dislike',
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const itemId = userId
	const collectionPathForUserReaction = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${reviewId}/${
		action === 'like' ? 'likes' : 'dislikes'
	}/${itemId}`
	const generalCollectionPathForUserReaction = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/${
		action === 'like' ? 'likes' : 'dislikes'
	}/${itemId}`

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
