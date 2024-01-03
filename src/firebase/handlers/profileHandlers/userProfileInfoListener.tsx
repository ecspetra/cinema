import { Dispatch, SetStateAction } from 'react'
import { IFullUserInfo } from '../../../../interfaces'
import { DataSnapshot, ref } from 'firebase/database'
import { onValue } from '@firebase/database'
import { database } from '@/firebase/config'

export const userProfileInfoListener = (
	userId: string,
	setProfile: Dispatch<SetStateAction<IFullUserInfo['info'] | null>>
) => {
	const userInfoPath = `users/${userId}/info`
	const userInfoRef = ref(database, userInfoPath)

	const onUserProfileInfoChanged = (snapshot: DataSnapshot) => {
		const profileData = snapshot.val()
		setProfile(profileData)
	}
	const unsubscribeUserProfileInfoChanged = onValue(
		userInfoRef,
		onUserProfileInfoChanged
	)

	return () => {
		unsubscribeUserProfileInfoChanged()
	}
}
