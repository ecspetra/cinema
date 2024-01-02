import { UserCollections } from '@/constants/enum'
import { get, ref } from 'firebase/database'
import { auth, database } from '@/firebase/config'

export const getCollectionItem = (
	itemId: number,
	collectionType: UserCollections
): Promise<boolean> => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid
	const collectionPath = `users/${userId}/collection/${collectionType}/${itemId}`
	const itemRef = ref(database, collectionPath)

	return new Promise(async resolve => {
		let isCollectionItem = false

		get(itemRef).then(snapshot => {
			if (snapshot.exists()) isCollectionItem = true

			resolve(isCollectionItem)
		})
	})
}
