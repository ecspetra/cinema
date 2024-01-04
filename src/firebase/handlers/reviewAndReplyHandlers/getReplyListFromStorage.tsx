import { UserCollections } from '@/constants/enum'
import { get, ref } from 'firebase/database'
import { database } from '@/firebase/config'
import { IReviewItemCard } from '../../../../interfaces'

export const getReplyListFromStorage = async (
	reviewedItemId: number,
	reviewId: string,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPathForReplies = `${reviewedItemCollectionType}/${reviewedItemId}/replies/`
	const collectionRefForReplies = ref(database, collectionPathForReplies)
	try {
		const snapshot = await get(collectionRefForReplies)
		const replyList: IReviewItemCard[] = []

		if (snapshot.exists()) {
			snapshot.forEach(childSnapshot => {
				const reply = childSnapshot.val()
				if (reply.reviewId === reviewId) {
					replyList.push(reply)
				}
			})
		}

		return replyList
	} catch (error) {
		return []
	}
}
