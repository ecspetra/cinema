import { UserCollections } from '@/constants/enum'
import { ref, remove } from 'firebase/database'
import { auth, database } from '@/firebase/config'

export const removeCollectionItem = (
	itemId: number,
	collectionType: UserCollections
) => {
	const currentUser = auth.currentUser
	const currentUserId = currentUser?.uid
	const collectionPathForRemovedItem = `users/${currentUserId}/collection/${collectionType}/${itemId}`
	const collectionRefForRemovedItem = ref(
		database,
		collectionPathForRemovedItem
	)

	return new Promise(async resolve => {
		let isItemRemovedFromCollection = false

		remove(collectionRefForRemovedItem).then(() => {
			isItemRemovedFromCollection = true
		})

		resolve(isItemRemovedFromCollection)
	})
}
