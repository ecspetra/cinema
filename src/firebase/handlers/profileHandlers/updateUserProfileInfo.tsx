import { auth } from '@/firebase/config'
import { updateProfile } from 'firebase/auth'
import { updateUserInStorage } from '@/firebase/handlers/profileHandlers/updateUserInStorage'
import { IProfileEditFormData } from '@/components/Profile/hooks/useProfileEditFormReducer'

export const updateUserProfileInfo = async (
	updatedUserInfo: IProfileEditFormData
) => {
	const currentUser = auth.currentUser!
	const displayName = updatedUserInfo.name.value
	const userId = currentUser?.uid
	const photoURL = currentUser?.photoURL

	const updatedFields = {
		displayName: updatedUserInfo.name.value,
		country: updatedUserInfo.country.value,
		dateOfBirth: updatedUserInfo.dateOfBirth.value,
		about: updatedUserInfo.about.value,
	}

	await updateProfile(currentUser, { displayName, photoURL })
	await updateUserInStorage(updatedFields, userId)
}
