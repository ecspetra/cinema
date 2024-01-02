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
	const collectionPath = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${reviewId}/${
		action === 'like' ? 'likes' : 'dislikes'
	}/${itemId}`
	const generalCollectionPath = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/${
		action === 'like' ? 'likes' : 'dislikes'
	}/${itemId}`

	const itemRef = ref(database, collectionPath)
	const generalCollectionItemRef = ref(database, generalCollectionPath)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(itemRef).then(() => {
			remove(generalCollectionItemRef).then(() => {
				isRemoved = true
			})
		})

		resolve(isRemoved)
	})
}
