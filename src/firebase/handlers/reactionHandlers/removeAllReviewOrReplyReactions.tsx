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
	const collectionPath = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${itemId}`
	const generalCollectionPath = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}`

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
