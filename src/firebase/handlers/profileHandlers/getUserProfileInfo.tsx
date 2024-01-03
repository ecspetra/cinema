import { IFullUserInfo } from '../../../../interfaces'
import { get, ref } from 'firebase/database'
import { database } from '@/firebase/config'

export const getUserProfileInfo = async (
	userId: string
): Promise<IFullUserInfo> => {
	const userPath = `users/${userId}`
	const userRef = ref(database, userPath)

	return new Promise(async resolve => {
		get(userRef).then(snapshot => {
			let userInfo = null

			if (snapshot.exists()) {
				userInfo = snapshot.val()
			}

			resolve(userInfo)
		})
	})
}
