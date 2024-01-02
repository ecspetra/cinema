import { ref, remove } from 'firebase/database'
import { auth, database } from '@/firebase/config'

export const removeFriend = (itemId: string): Promise<boolean> => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid

	const userCollectionFriendRef = ref(
		database,
		`users/${userId}/friends/${itemId}`
	)
	const friendRef = ref(database, `users/${itemId}/friends/${userId}`)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(userCollectionFriendRef).then(() => {
			remove(friendRef).then(() => {
				isRemoved = true
			})
		})

		resolve(isRemoved)
	})
}
