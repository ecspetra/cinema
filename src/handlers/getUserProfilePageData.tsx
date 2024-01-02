import { getUserCollection } from '@/handlers/getUserCollection'
import { IFullUserInfo } from '../../interfaces'
import { getUserFriendList } from '@/firebase/handlers/friendHandlers/getUserFriendList'
import { getUserProfileInfo } from '@/firebase/handlers/profileHandlers/getUserProfileInfo'

export const getUserProfilePageData = async (
	userIdFromUrl: string
): Promise<IFullUserInfo> => {
	try {
		let friends: IFullUserInfo[] = []
		const user = await getUserProfileInfo(userIdFromUrl)
		const userCollection = await getUserCollection(userIdFromUrl)

		if (user.friends) {
			friends = await getUserFriendList(user.friends)
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
