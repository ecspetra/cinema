import { IReviewItemCard } from '../../../../interfaces'
import { UserCollections } from '@/constants/enum'
import {
	DataSnapshot,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	ref,
} from 'firebase/database'
import { database } from '@/firebase/config'
import { Dispatch, SetStateAction } from 'react'

export const movieOrTVShowReviewsListener = (
	collectionId: number | string,
	reviewListConfig: {
		oldItems: IReviewItemCard[]
		setItems: Dispatch<SetStateAction<IReviewItemCard[]>>
		reviewedItemCollectionType?: UserCollections.movie | UserCollections.tv
	}
) => {
	const { oldItems, setItems, reviewedItemCollectionType } = reviewListConfig
	const generalCollectionPathForReviews = `${reviewedItemCollectionType}/${collectionId}/reviews/`
	const generalCollectionRefForReviews = ref(
		database,
		generalCollectionPathForReviews
	)

	const onReviewAdded = (childSnapshot: DataSnapshot) => {
		const newReview = childSnapshot.val()
		if (!oldItems.some(existingItem => existingItem.id === newReview.id)) {
			setItems(prevItems => [newReview, ...prevItems])
		}
	}

	const onReviewRemoved = (childSnapshot: DataSnapshot) => {
		const removedReview = childSnapshot.val()
		setItems(prevItems =>
			prevItems.filter(item => item.id !== removedReview.id)
		)
	}

	const onReviewChanged = (childSnapshot: DataSnapshot) => {
		const updatedReview = childSnapshot.val()
		setItems(prevItems => {
			const updatedIndex = prevItems.findIndex(
				item => item.id === updatedReview.id
			)
			if (updatedIndex !== -1) {
				prevItems[updatedIndex] = updatedReview
				return [...prevItems]
			}
			return prevItems
		})
	}

	const unsubscribeReviewAdded = onChildAdded(
		generalCollectionRefForReviews,
		onReviewAdded
	)
	const unsubscribeReviewRemoved = onChildRemoved(
		generalCollectionRefForReviews,
		onReviewRemoved
	)
	const unsubscribeReviewChanged = onChildChanged(
		generalCollectionRefForReviews,
		onReviewChanged
	)

	return () => {
		unsubscribeReviewAdded()
		unsubscribeReviewRemoved()
		unsubscribeReviewChanged()
	}
}
