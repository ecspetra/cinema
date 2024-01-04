import { UserCollections } from '@/constants/enum'
import { get, ref } from 'firebase/database'
import { database } from '@/firebase/config'

export const getReviewFromAnotherUserCollection = async (
	reviewAuthorId: string,
	reviewId: string,
	collectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPathForReview = `users/${reviewAuthorId}/collection/reviews/${collectionType}/${reviewId}`
	const collectionRefForReview = ref(database, collectionPathForReview)

	try {
		const snapshot = await get(collectionRefForReview)

		if (snapshot.exists()) {
			const review = snapshot.val()
			return review
		} else {
			return
		}
	} catch (error) {
		return null
	}
}
