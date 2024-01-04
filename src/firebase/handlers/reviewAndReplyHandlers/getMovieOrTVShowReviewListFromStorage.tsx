import { UserCollections } from '@/constants/enum'
import { get, ref } from 'firebase/database'
import { database } from '@/firebase/config'

export const getMovieOrTVShowReviewListFromStorage = async (
	reviewedItemId: string,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPathForReviews = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/`
	const collectionRefForReviews = ref(database, collectionPathForReviews)

	try {
		const snapshot = await get(collectionRefForReviews)

		if (snapshot.exists()) {
			const data = snapshot.val()
			const reviewList = Object.values(data)
			return reviewList
		} else {
			return []
		}
	} catch (error) {
		return []
	}
}
