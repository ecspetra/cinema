import { UserCollections } from '@/constants/enum'
import { ref, set } from 'firebase/database'
import { auth, database } from '@/firebase/config'

export const createNewCollectionItem = async (
	itemId: number,
	collectionType: UserCollections
) => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid
	const collectionPath = `users/${userId}/collection/${collectionType}/${itemId}`
	const newCollectionItemRef = ref(database, collectionPath)

	const newItem = {
		id: itemId,
	}

	await set(newCollectionItemRef, newItem)
}
