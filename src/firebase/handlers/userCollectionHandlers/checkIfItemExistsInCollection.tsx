import { UserCollections } from '@/constants/enum'
import { get, ref } from 'firebase/database'
import { auth, database } from '@/firebase/config'

export const checkIfItemExistsInCollection = (
	itemId: number,
	collectionType:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
): Promise<boolean> => {
	const currentUser = auth.currentUser
	const currentUserId = currentUser?.uid
	const collectionPathForItem = `users/${currentUserId}/collection/${collectionType}/${itemId}`
	const collectionRefForItem = ref(database, collectionPathForItem)

	return new Promise(async resolve => {
		let isItemExistsInCollection = false

		get(collectionRefForItem).then(snapshot => {
			if (snapshot.exists()) isItemExistsInCollection = true

			resolve(isItemExistsInCollection)
		})
	})
}
