import { UserCollections } from '@/constants/enum'
import { get, orderByKey, query, ref } from 'firebase/database'
import { database } from '@/firebase/config'

export const getReviewsOrRepliesFromUserCollection = async (
	collectionOwnerId: string,
	collectionType: UserCollections.reviews | UserCollections.replies
) => {
	try {
		const collectionPath = `users/${collectionOwnerId}/collection/${collectionType}/`
		const userCollectionRef = ref(database, collectionPath)
		const paginationQuery = query(userCollectionRef, orderByKey())
		const snapshot = await get(paginationQuery)
		const data = snapshot.val() || {}
		const itemsFromDB = []

		for (const type in data) {
			const items = data[type]

			for (const itemId in items) {
				const review = items[itemId]
				itemsFromDB.push(review)
			}
		}

		return itemsFromDB
	} catch (error) {
		throw error
	}
}
