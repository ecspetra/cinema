import { ITag } from '../../../../interfaces'
import { auth } from '@/firebase/config'
import { updateUserInStorage } from '@/firebase/handlers/profileHandlers/updateUserInStorage'

export const updateUserProfileGenres = async (newGenres: ITag[]) => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid
	const updateFields = {
		favoriteGenres: newGenres,
	}

	await updateUserInStorage(updateFields, userId)
}
