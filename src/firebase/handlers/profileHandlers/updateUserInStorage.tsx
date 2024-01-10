import { get, ref, set } from 'firebase/database'
import { database } from '@/firebase/config'

export const updateUserInStorage = async (
	updatedFields: object,
	userId: string
) => {
	const userToUpdatePath = `users/${userId}/info`
	const userToUpdateRef = ref(database, userToUpdatePath)

	const oldUserInfo = (await get(userToUpdateRef)).val()
	const updatedUserData = {
		...oldUserInfo,
		...updatedFields,
	}

	await set(userToUpdateRef, updatedUserData)
}
