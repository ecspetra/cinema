import { auth } from '@/firebase/config'
import { updateProfile } from 'firebase/auth'
import { updateUserInStorage } from '@/firebase/handlers/profileHandlers/updateUserInStorage'

export const updateUserProfileIcon = async (newIcon: string) => {
	const currentUser = auth.currentUser!
	const displayName = currentUser?.displayName
	const currentUserId = currentUser?.uid
	const photoURL = newIcon

	const updateFields = {
		photoURL: newIcon,
	}

	await updateProfile(currentUser, { displayName, photoURL })
	await updateUserInStorage(updateFields, currentUserId)
}
