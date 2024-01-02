import { IFullUserInfo } from '../../../../interfaces'
import { get, ref } from 'firebase/database'
import { database } from '@/firebase/config'

export const getUserProfileInfo = async (
	userId: string
): Promise<IFullUserInfo> => {
	const infoPath = `users/${userId}`
	const itemRef = ref(database, infoPath)

	return new Promise(async resolve => {
		get(itemRef).then(snapshot => {
			let userInfo = {}
			if (snapshot.exists()) {
				userInfo = snapshot.val()
			}

			resolve(userInfo)
		})
	})
}
