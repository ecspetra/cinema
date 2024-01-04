import { UserCollections } from '@/constants/enum'
import { ref, set } from 'firebase/database'
import { auth, database } from '@/firebase/config'

export const createNewCollectionItem = async (
	itemId: number,
	collectionType:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
) => {
	const currentUser = auth.currentUser
	const currentUserId = currentUser?.uid
	const newCollectionItemPath = `users/${currentUserId}/collection/${collectionType}/${itemId}`
	const newCollectionItemRef = ref(database, newCollectionItemPath)

	const newItem = {
		id: itemId,
	}

	await set(newCollectionItemRef, newItem)
}
