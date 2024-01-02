import { UserCollections } from '@/constants/enum'
import { ref, remove } from 'firebase/database'
import { auth, database } from '@/firebase/config'

export const removeCollectionItem = (
	itemId: number,
	collectionType: UserCollections
) => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid
	const collectionPath = `users/${userId}/collection/${collectionType}/${itemId}`
	const itemRef = ref(database, collectionPath)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(itemRef).then(() => {
			isRemoved = true
		})

		resolve(isRemoved)
	})
}
