import { IReviewCard } from '../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import { ref, set } from 'firebase/database'
import { database } from '@/firebase/config'

export const createReview = async (
	item: IReviewCard,
	userId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPath = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${item.id}`
	const generalCollectionPath = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${item.id}`
	const newCollectionItemRef = ref(database, collectionPath)
	const newGeneralCollectionItemRef = ref(database, generalCollectionPath)

	await set(newCollectionItemRef, item)
	await set(newGeneralCollectionItemRef, item)
}
