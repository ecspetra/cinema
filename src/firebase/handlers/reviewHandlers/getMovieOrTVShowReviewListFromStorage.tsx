import { UserCollections } from '@/constants/enum'
import { get, ref } from 'firebase/database'
import { database } from '@/firebase/config'

export const getMovieOrTVShowReviewListFromStorage = async (
	reviewedItemId: string,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPath = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/`
	const reviewsCollectionRef = ref(database, collectionPath)

	try {
		const snapshot = await get(reviewsCollectionRef)

		if (snapshot.exists()) {
			const data = snapshot.val()
			const result = Object.values(data)
			return result
		} else {
			return []
		}
	} catch (error) {
		return []
	}
}
