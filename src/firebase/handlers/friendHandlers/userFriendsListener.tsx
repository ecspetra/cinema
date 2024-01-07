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
	friendListState: {
		oldFriendList: IFullUserInfo[]
		setFriends: Dispatch<SetStateAction<IFullUserInfo[]>>
	}
) => {
	const { oldFriendList, setFriends } = friendListState
	const userRef = ref(database, `users/${userId}/friends`)

	const onFriendAdded = async (childSnapshot: DataSnapshot) => {
		const newFriendId = childSnapshot.val()
		const isOldFriendListEmpty = oldFriendList.length === 0
		const isNewFriendExistsInOldFriendList = oldFriendList.some(
			existingItem => existingItem.info.id === newFriendId
		)

		if (isOldFriendListEmpty || !isNewFriendExistsInOldFriendList) {
			const newFriendInfo = await getUserProfileInfo(newFriendId)
			setFriends(prevItems => [newFriendInfo, ...prevItems])
		}
	}

	const onFriendRemoved = (childSnapshot: DataSnapshot) => {
		const removedFriendId = childSnapshot.val()
		setFriends(prevItems =>
			prevItems.filter(item => item.info.id !== removedFriendId)
		)
	}

	const unsubscribeFriendAdded = onChildAdded(userRef, onFriendAdded)
	const unsubscribeFriendRemoved = onChildRemoved(userRef, onFriendRemoved)

	return () => {
		unsubscribeFriendAdded()
		unsubscribeFriendRemoved()
	}
}
