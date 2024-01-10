import { DataSnapshot, ref } from 'firebase/database'
import { onValue } from '@firebase/database'
import { database } from '@/firebase/config'

export const userContextListener = (
	oldUserProfileData: { userId: string; photoURL: string; userName: string },
	updateUserProfile: () => void
) => {
	const userRef = ref(database, `users/${oldUserProfileData.userId}/info`)

	const onUserProfileChanged = (snapshot: DataSnapshot) => {
		const newUserProfileData = snapshot.val()

		if (
			oldUserProfileData.photoURL !== newUserProfileData?.photoURL ||
			oldUserProfileData.userName !== newUserProfileData?.displayName
		) {
			updateUserProfile()
		}
	}

	const unsubscribeUserProfile = onValue(userRef, onUserProfileChanged)

	return () => {
		unsubscribeUserProfile()
	}
}
