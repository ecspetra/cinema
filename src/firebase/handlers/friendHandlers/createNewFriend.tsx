import { ref, set } from 'firebase/database'
import { auth, database } from '@/firebase/config'

export const createNewFriend = async (newFriendId: string) => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid
	const currentUserCollectionPath = `users/${userId}/friends/${newFriendId}/`
	const newFriendCollectionPath = `users/${newFriendId}/friends/${userId}/`

	const itemRef = ref(database, currentUserCollectionPath)
	const friendItemRef = ref(database, newFriendCollectionPath)

	await set(itemRef, newFriendId)
	await set(friendItemRef, userId)
}
