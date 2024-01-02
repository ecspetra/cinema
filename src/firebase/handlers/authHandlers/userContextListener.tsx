import { DataSnapshot, ref } from 'firebase/database'
import { onValue } from '@firebase/database'
import { database } from '@/firebase/config'

export const userContextListener = (
	userId: string,
	prevData: object,
	updateUserProfile: () => void
) => {
	const userRef = ref(database, `users/${userId}/info`)

	const onInfoChanged = (snapshot: DataSnapshot) => {
		const profileData = snapshot.val()

		if (
			prevData.photoURL !== profileData?.photoURL ||
			prevData.userName !== profileData?.displayName
		) {
			updateUserProfile()
		}
	}

	const unsubscribe = onValue(userRef, onInfoChanged)

	return () => {
		unsubscribe()
	}
}
