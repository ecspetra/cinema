import { get, ref, set } from 'firebase/database'
import { database } from '@/firebase/config'

export const updateUserInStorage = async (
	updatedFields: object,
	userId: string
) => {
	const userToUpdatePath = `users/${userId}`
	const userToUpdateRef = ref(database, userToUpdatePath)

	const userData = (await get(userToUpdateRef)).val()
	const oldUserInfo = userData.info
	const updatedUserData = {
		info: {
			...oldUserInfo,
			...updatedFields,
		},
	}

	await set(userToUpdateRef, updatedUserData)
}
