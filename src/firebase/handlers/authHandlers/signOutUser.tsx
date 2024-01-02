import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/config'

export const signOutUser = async () => {
	try {
		await signOut(auth)
	} catch (error) {
		throw error
	}
}
