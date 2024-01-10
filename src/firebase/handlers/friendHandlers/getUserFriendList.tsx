import { IFullUserInfo } from '../../../../interfaces'
import { getUserProfileInfo } from '@/firebase/handlers/profileHandlers/getUserProfileInfo'

export const getUserFriendList = (
	friendIdsList: { userId: string }[]
): Promise<IFullUserInfo[]> => {
	return new Promise(async resolve => {
		let friendsWithFullUserInfo: IFullUserInfo[] = []

		const promises = Object.keys(friendIdsList).map(
			async (userId: string) => {
				const userInfo = await getUserProfileInfo(userId)
				friendsWithFullUserInfo.push(userInfo)
			}
		)

		await Promise.all(promises)

		resolve(friendsWithFullUserInfo)
	})
}
