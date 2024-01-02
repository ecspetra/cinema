import { IFullUserInfo } from '../../../../interfaces'
import { getUserProfileInfo } from '@/firebase/handlers/profileHandlers/getUserProfileInfo'

export const getUserFriendList = (friendIdsList): Promise<IFullUserInfo[]> => {
	return new Promise(async resolve => {
		let friendsInfo: IFullUserInfo[] = []

		const promises = Object.keys(friendIdsList).map(async (id: string) => {
			const friend = await getUserProfileInfo(id)
			friendsInfo.push(friend)
		})

		await Promise.all(promises)

		resolve(friendsInfo)
	})
}
