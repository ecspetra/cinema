import { ref, set } from 'firebase/database'
import { database } from '@/firebase/config'
import { User } from 'firebase/auth'

export const addUserToStorage = async (newUser: User) => {
	const newUserPath = `users/${newUser.uid}`
	const newUserRef = ref(database, newUserPath)

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
