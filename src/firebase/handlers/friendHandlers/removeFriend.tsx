import { ref, remove } from 'firebase/database'
import { auth, database } from '@/firebase/config'

export const removeFriend = (friendId: string): Promise<boolean> => {
	const currentUser = auth.currentUser
	const currentUserId = currentUser?.uid
	const friendsCollectionPathForCurrentUser = `users/${currentUserId}/friends/${friendId}`
	const friendsCollectionPathForRemovedFriend = `users/${friendId}/friends/${currentUserId}`
	const friendsCollectionRefForCurrentUser = ref(
		database,
		friendsCollectionPathForCurrentUser
	)
	const friendsCollectionRefForNewFriend = ref(
		database,
		friendsCollectionPathForRemovedFriend
	)

	return new Promise(async resolve => {
		let isFriendRemovedFromCollection = false

		remove(friendsCollectionRefForCurrentUser).then(() => {
			remove(friendsCollectionRefForNewFriend).then(() => {
				isFriendRemovedFromCollection = true
			})
		})

		resolve(isFriendRemovedFromCollection)
	})
}
