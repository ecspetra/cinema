import { UserCollections } from '@/constants/enum'
import { get, ref, remove } from 'firebase/database'
import { database } from '@/firebase/config'
import { removeAllReviewOrReplyReactions } from '@/firebase/handlers/reactionHandlers/removeAllReviewOrReplyReactions'

export const removeReviewOrReply = async (
	itemId: string,
	reviewedItemId: number,
	userId: string,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
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

	return new Promise(async resolve => {
		let isReviewOrReplyRemovedFromCollection = false

		if (collectionType === UserCollections.reviews) {
			const collectionPathForReply = `users/${userId}/collection/replies/${reviewedItemCollectionType}/`
			const generalCollectionPathForReply = `${reviewedItemCollectionType}/${reviewedItemId}/replies/`
			const collectionRefForReply = ref(database, collectionPathForReply)
			const generalCollectionRefForReply = ref(
				database,
				generalCollectionPathForReply
			)

			const removeRepliesForReviewInCollection = async (
				isRemoveFromUserCollection: boolean = false
			) => {
				const snapshot = isRemoveFromUserCollection
					? await get(collectionRefForReply)
					: await get(generalCollectionRefForReply)

				if (snapshot.exists()) {
					snapshot.forEach(childSnapshot => {
						const reply = childSnapshot.val()
						if (reply.reviewId === itemId) {
							const replyPath = isRemoveFromUserCollection
								? `users/${userId}/collection/replies/${reviewedItemCollectionType}/${childSnapshot.key}`
								: `${reviewedItemCollectionType}/${reviewedItemId}/replies/${childSnapshot.key}`
							const replyRef = ref(database, replyPath)
							remove(replyRef)
						}
					})
				}
			}

			await removeRepliesForReviewInCollection()
			await removeRepliesForReviewInCollection(true)
		}

		remove(collectionRefForReviewOrReply).then(() => {
			remove(generalCollectionRefForReviewOrReply)
				.then(() =>
					removeAllReviewOrReplyReactions(
						userId,
						itemId,
						reviewedItemId,
						collectionType,
						reviewedItemCollectionType
					)
				)
				.then(() => {
					isReviewOrReplyRemovedFromCollection = true
				})
		})
		resolve(isReviewOrReplyRemovedFromCollection)
	})
}
