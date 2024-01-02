import { UserCollections } from '@/constants/enum'
import { get, ref } from 'firebase/database'
import { database } from '@/firebase/config'

export const getReplyListFromStorage = async (
	reviewedItemId: number,
	reviewId: string,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPath = `${reviewedItemCollectionType}/${reviewedItemId}/replies/`
	const repliesCollectionRef = ref(database, collectionPath)
	try {
		const snapshot = await get(repliesCollectionRef)
		const replies = []

		if (snapshot.exists()) {
			snapshot.forEach(childSnapshot => {
				const reply = childSnapshot.val()
				if (reply.reviewId === reviewId) {
					replies.push(reply)
				}
			})
		}

		return replies
	} catch (error) {
		return []
	}
}
