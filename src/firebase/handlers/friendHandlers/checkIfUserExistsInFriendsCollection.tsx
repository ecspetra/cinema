import { get, ref } from 'firebase/database'
import { auth, database } from '@/firebase/config'

export const checkIfUserExistsInFriendsCollection = (
	friendId: string
): Promise<boolean> => {
	const currentUser = auth.currentUser
	const currentUserId = currentUser?.uid
	const currentUserFriendsCollectionPath = `users/${currentUserId}/friends/${friendId}`
	const currentUserFriendsCollectionRef = ref(
		database,
		currentUserFriendsCollectionPath
	)

	return new Promise(async resolve => {
		let isUserExistsInFriendsCollection = false

		get(currentUserFriendsCollectionRef).then(snapshot => {
			if (snapshot.exists()) isUserExistsInFriendsCollection = true

			resolve(isUserExistsInFriendsCollection)
		})
	})
}
