import { IReviewCard } from '../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import {
	DataSnapshot,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	ref,
} from 'firebase/database'
import { database } from '@/firebase/config'

export const movieOrTVShowReviewsListener = (
	collectionId: number | string,
	loadedItems: IReviewCard[],
	setItems: ([]) => void,
	reviewedItemCollectionType?: UserCollections.movie | UserCollections.tv
) => {
	const reviewsRef = ref(
		database,
		`${reviewedItemCollectionType}/${collectionId}/reviews/`
	)

	const onReviewAdded = (childSnapshot: DataSnapshot) => {
		const newItem = childSnapshot.val()
		if (!loadedItems.some(existingItem => existingItem.id === newItem.id)) {
			setItems(prevItems => [newItem, ...prevItems])
		}
	}

	const onReviewRemoved = (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()
		setItems(prevItems =>
			prevItems.filter(item => item.id !== removedItem.id)
		)
	}

	const onReviewChanged = (childSnapshot: DataSnapshot) => {
		const updatedItem = childSnapshot.val()
		setItems(prevItems => {
			const updatedIndex = prevItems.findIndex(
				item => item.id === updatedItem.id
			)
			if (updatedIndex !== -1) {
				prevItems[updatedIndex] = updatedItem
				return [...prevItems]
			}
			return prevItems
		})
	}

	const unsubscribeReviewAdded = onChildAdded(reviewsRef, onReviewAdded)
	const unsubscribeReviewRemoved = onChildRemoved(reviewsRef, onReviewRemoved)
	const unsubscribeReviewChanged = onChildChanged(reviewsRef, onReviewChanged)

	return () => {
		unsubscribeReviewAdded()
		unsubscribeReviewRemoved()
		unsubscribeReviewChanged()
	}
}
