import { UserCollections } from '@/constants/enum'
import { ref, set } from 'firebase/database'
import { database } from '@/firebase/config'
import { removeReviewOrReplyReaction } from '@/firebase/handlers/reactionHandlers/removeReviewOrReplyReaction'

export const createNewReviewOrReplyReaction = async (
	userId: string,
	itemId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	action: 'like' | 'dislike',
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPathForUserReaction = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${itemId}/${
		action === 'like' ? 'likes' : 'dislikes'
	}/${userId}`
	const generalCollectionPathForUserReaction = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}/${
		action === 'like' ? 'likes' : 'dislikes'
	}/${userId}`

	const collectionRefForUserReaction = ref(
		database,
		collectionPathForUserReaction
	)
	const generalCollectionRefForUserReaction = ref(
		database,
		generalCollectionPathForUserReaction
	)

	await set(collectionRefForUserReaction, itemId)
	await set(generalCollectionRefForUserReaction, itemId)
	await removeReviewOrReplyReaction(
		userId,
		itemId,
		reviewedItemId,
		collectionType,
		action === 'like' ? 'dislike' : 'like',
		reviewedItemCollectionType
	)
}
