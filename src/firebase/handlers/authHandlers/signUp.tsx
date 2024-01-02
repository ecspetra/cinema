import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth'
import { auth } from '@/firebase/config'
import { addUserToStorage } from '@/firebase/handlers/profileHandlers/addUserToStorage'

export const signUp = async (
	email: string,
	password: string,
	displayName: string
) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		const newUser = userCredential.user
		const photoURL = `https://api.dicebear.com/5.x/thumbs/svg?seed=${newUser.uid}`

		await updateProfile(newUser, { displayName, photoURL })
		await addUserToStorage(newUser)
		await signInWithEmailAndPassword(auth, email, password)
	} catch (error) {
		throw error
	}
}
