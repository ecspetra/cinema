import { ref, set } from 'firebase/database'
import { auth, database } from '@/firebase/config'

export const createNewFriend = async (newFriendId: string) => {
	const currentUser = auth.currentUser
	const currentUserId = currentUser?.uid
	const friendsCollectionPathForCurrentUser = `users/${currentUserId}/friends/${newFriendId}/`
	const friendsCollectionPathForNewFriend = `users/${newFriendId}/friends/${currentUserId}/`
	const friendsCollectionRefForCurrentUser = ref(
		database,
		friendsCollectionPathForCurrentUser
	)
	const friendsCollectionRefForNewFriend = ref(
		database,
		friendsCollectionPathForNewFriend
	)

	await set(friendsCollectionRefForCurrentUser, newFriendId)
	await set(friendsCollectionRefForNewFriend, currentUserId)
}
