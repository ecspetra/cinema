import { ref, set } from 'firebase/database'
import { database } from '@/firebase/config'

export const addUserToStorage = async (newUser: object) => {
	const newUserRef = ref(database, `users/${newUser.uid}`)

	const newUserData = {
		info: {
			displayName: newUser.displayName,
			id: newUser.uid,
			email: newUser.email,
			photoURL: newUser.photoURL,
		},
	}

	await set(newUserRef, newUserData)
}
