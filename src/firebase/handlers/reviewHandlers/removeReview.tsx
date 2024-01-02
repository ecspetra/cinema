import { UserCollections } from '@/constants/enum'
import { get, ref, remove } from 'firebase/database'
import { database } from '@/firebase/config'
import { removeAllReviewOrReplyReactions } from '@/firebase/handlers/reactionHandlers/removeAllReviewOrReplyReactions'

export const removeReview = async (
	itemId: string,
	reviewedItemId: number,
	userId: string,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPath = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${itemId}`
	const generalCollectionPath = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}`

	const itemRef = ref(database, collectionPath)
	const generalCollectionItemRef = ref(database, generalCollectionPath)

	return new Promise(async resolve => {
		let isRemoved = false

		if (collectionType === UserCollections.reviews) {
			const repliesCollectionPath = `users/${userId}/collection/replies/${reviewedItemCollectionType}/`
			const repliesGeneralCollectionPath = `${reviewedItemCollectionType}/${reviewedItemId}/replies/`

			const repliesCollectionRef = ref(database, repliesCollectionPath)
			const repliesGeneralCollectionRef = ref(
				database,
				repliesGeneralCollectionPath
			)

			const removeReviewRepliesInUserCollection = async () => {
				const snapshot = await get(repliesCollectionRef)

				if (snapshot.exists()) {
					snapshot.forEach(childSnapshot => {
						const reply = childSnapshot.val()
						if (reply.reviewId === itemId) {
							const replyPath = `users/${userId}/collection/replies/${reviewedItemCollectionType}/${childSnapshot.key}`
							const replyRef = ref(database, replyPath)
							remove(replyRef)
						}
					})
				}
			}

			const removeReviewRepliesInGeneralCollection = async () => {
				const snapshot = await get(repliesGeneralCollectionRef)

				if (snapshot.exists()) {
					snapshot.forEach(childSnapshot => {
						const reply = childSnapshot.val()
						if (reply.reviewId === itemId) {
							const replyPath = `${reviewedItemCollectionType}/${reviewedItemId}/replies/${childSnapshot.key}`
							const replyRef = ref(database, replyPath)
							remove(replyRef)
						}
					})
				}
			}

			await removeReviewRepliesInUserCollection()
			await removeReviewRepliesInGeneralCollection()
		}

		remove(itemRef).then(() => {
			remove(generalCollectionItemRef)
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
					isRemoved = true
				})
		})
		resolve(isRemoved)
	})
}
