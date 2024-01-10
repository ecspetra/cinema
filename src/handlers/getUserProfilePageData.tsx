import { getUserCollection } from '@/handlers/getUserCollection'
import { IFullUserInfo } from '../../interfaces'
import { getUserFriendList } from '@/firebase/handlers/friendHandlers/getUserFriendList'
import { getUserProfileInfo } from '@/firebase/handlers/profileHandlers/getUserProfileInfo'

export const getUserProfilePageData = async (
	userIdFromUrl: string
): Promise<IFullUserInfo> => {
	try {
		let friendList: IFullUserInfo[] = []
		const user = await getUserProfileInfo(userIdFromUrl)
		const userCollection = await getUserCollection(userIdFromUrl)

		if (user.friends) {
			friendList = await getUserFriendList(
				user.friends as { userId: string }[]
			)
		}

		return {
			info: user.info,
			friends: friendList,
			collection: userCollection,
		}
	} catch (error) {
		throw error
	}
}
