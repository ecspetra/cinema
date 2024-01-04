import { UserCollections } from '@/constants/enum'
import { get, orderByKey, query, ref } from 'firebase/database'
import { database } from '@/firebase/config'

export const getReviewsOrRepliesFromUserCollection = async (
	collectionOwnerId: string,
	collectionType: UserCollections.reviews | UserCollections.replies
) => {
	try {
		const collectionPathForReviewsOrReplies = `users/${collectionOwnerId}/collection/${collectionType}/`
		const collectionRefForReviewsOrReplies = ref(
			database,
			collectionPathForReviewsOrReplies
		)
		const paginationQuery = query(
			collectionRefForReviewsOrReplies,
			orderByKey()
		)
		const snapshot = await get(paginationQuery)
		const data = snapshot.val() || {}
		const itemsFromStorage = []

		for (const type in data) {
			const items = data[type]

			for (const itemId in items) {
				const review = items[itemId]
				itemsFromStorage.push(review)
			}
		}

		return itemsFromStorage
	} catch (error) {
		throw error
	}
}
