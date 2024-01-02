import { Dispatch, SetStateAction } from 'react'
import { IFullUserInfo } from '../../../../interfaces'
import {
	DataSnapshot,
	onChildAdded,
	onChildRemoved,
	ref,
} from 'firebase/database'
import { database } from '@/firebase/config'
import { getUserProfileInfo } from '@/firebase/handlers/profileHandlers/getUserProfileInfo'

export const userFriendsListener = (
	userId: string,
	loadedItems: object[],
	setFriends: Dispatch<SetStateAction<IFullUserInfo[]>>
) => {
	const userRef = ref(database, `users/${userId}/friends`)

	const onFriendAdded = async (childSnapshot: DataSnapshot) => {
		const newFriendId = childSnapshot.val()

		if (
			loadedItems.length === 0 ||
			!loadedItems.some(
				existingItem => existingItem.info.id === newFriendId
			)
		) {
			const newFriend = await getUserProfileInfo(newFriendId)
			setFriends(prevItems => [newFriend, ...prevItems])
		}
	}

	const onFriendRemoved = (childSnapshot: DataSnapshot) => {
		const removedItemId = childSnapshot.val()
		setFriends(prevItems =>
			prevItems.filter(item => item.info.id !== removedItemId)
		)
	}

	const unsubscribeFriendAdded = onChildAdded(userRef, onFriendAdded)
	const unsubscribeFriendRemoved = onChildRemoved(userRef, onFriendRemoved)

	return () => {
		unsubscribeFriendAdded()
		unsubscribeFriendRemoved()
	}
}
