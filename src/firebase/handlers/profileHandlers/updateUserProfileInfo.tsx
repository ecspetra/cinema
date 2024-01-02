import { auth } from '@/firebase/config'
import { updateProfile } from 'firebase/auth'
import { updateUserInStorage } from '@/firebase/handlers/profileHandlers/updateUserInStorage'

export const updateUserProfileInfo = async (newInfo: object) => {
	const currentUser = auth.currentUser
	const displayName = newInfo.name.value
	const userId = currentUser?.uid
	const photoURL = currentUser?.photoURL

	const updateFields = {
		displayName: newInfo.name.value,
		country: newInfo.country.value,
		dateOfBirth: newInfo.dateOfBirth.value,
		about: newInfo.about.value,
	}

	await updateProfile(currentUser, { displayName, photoURL })
	await updateUserInStorage(updateFields, userId)
}
