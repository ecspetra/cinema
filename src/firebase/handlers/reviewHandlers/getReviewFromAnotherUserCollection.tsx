import { UserCollections } from '@/constants/enum'
import { get, ref } from 'firebase/database'
import { database } from '@/firebase/config'

export const getReviewFromAnotherUserCollection = async (
	reviewAuthorId: string,
	reviewId: string,
	collectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPath = `users/${reviewAuthorId}/collection/reviews/${collectionType}/${reviewId}`
	const reviewRef = ref(database, collectionPath)

	try {
		const snapshot = await get(reviewRef)

		if (snapshot.exists()) {
			const data = snapshot.val()
			return data
		} else {
			return
		}
	} catch (error) {
		return error
	}
}
