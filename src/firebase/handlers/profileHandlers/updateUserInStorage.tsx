import { get, ref, set } from 'firebase/database'
import { database } from '@/firebase/config'

export const updateUserInStorage = async (
	updateFields: object,
	userId: string
) => {
	const newUserRef = ref(database, `users/${userId}`)

	const existingUserData = (await get(newUserRef)).val()
	const newUserData = {
		info: {
			...existingUserData.info,
			...updateFields,
		},
	}

	await set(newUserRef, newUserData)
}
