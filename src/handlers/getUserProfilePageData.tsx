import { getUserFriends, getUserInfo } from '@/firebase/config'
import { getUserCollection } from '@/handlers/getUserCollection'
import { IFullUserInfo } from '../../interfaces'

export const getUserProfilePageData = async (
	userIdFromUrl: string
): Promise<IFullUserInfo> => {
	try {
		let friends: IFullUserInfo[] = []
		const user = await getUserInfo(userIdFromUrl)
		const userCollection = await getUserCollection(userIdFromUrl)

		if (user.friends) {
			friends = await getUserFriends(user.friends)
		}

		return {
			info: user.info,
			friends: friends,
			collection: userCollection,
		}
	} catch (error) {
		throw error
	}
}
