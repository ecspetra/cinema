import { UserCollections } from '@/constants/enum'
import { ref, remove } from 'firebase/database'
import { database } from '@/firebase/config'

export const removeReviewOrReplyReaction = (
	userId: string,
	itemConfig: {
		reviewId: string
		reviewedItemId: number
		collectionType: UserCollections.reviews | UserCollections.replies
		reactionType: 'like' | 'dislike'
		reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
	}
) => {
	const {
		reviewId,
		reviewedItemId,
		collectionType,
		reactionType,
		reviewedItemCollectionType,
	} = itemConfig
	const reactionId = userId
	const collectionPathForUserReaction = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${reviewId}/${
		reactionType === 'like' ? 'likes' : 'dislikes'
	}/${reactionId}`
	const generalCollectionPathForUserReaction = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/${
		reactionType === 'like' ? 'likes' : 'dislikes'
	}/${reactionId}`

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
