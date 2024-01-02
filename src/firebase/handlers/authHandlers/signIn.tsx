import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/config'

export const signIn = async (email: string, password: string) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)
	} catch (error) {
		throw error
	}
}
