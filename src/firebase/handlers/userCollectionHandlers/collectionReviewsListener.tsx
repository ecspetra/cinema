import {
	DataSnapshot,
	onChildChanged,
	onChildRemoved,
	ref,
} from 'firebase/database'
import { database } from '@/firebase/config'
import { Dispatch, SetStateAction } from 'react'
import { IReviewItemCard } from '../../../../interfaces'

export const collectionReviewsListener = (
	collectionId: string | number,
	setItems: Dispatch<SetStateAction<IReviewItemCard[]>>
) => {
	const tvShowReviewsCollectionPath = `users/${collectionId}/collection/reviews/tv`
	const movieReviewsCollectionPath = `users/${collectionId}/collection/reviews/movie`
	const tvShowReviewsCollectionRef = ref(
		database,
		tvShowReviewsCollectionPath
	)
	const movieReviewsCollectionRef = ref(database, movieReviewsCollectionPath)

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

	const unsubscribeTVShowReviewRemoved = onChildRemoved(
		tvShowReviewsCollectionRef,
		onReviewRemoved
	)
	const unsubscribeTVShowReviewChanged = onChildChanged(
		tvShowReviewsCollectionRef,
		onReviewChanged
	)

	const unsubscribeMovieReviewRemoved = onChildRemoved(
		movieReviewsCollectionRef,
		onReviewRemoved
	)
	const unsubscribeMovieReviewChanged = onChildChanged(
		movieReviewsCollectionRef,
		onReviewChanged
	)

	return () => {
		unsubscribeTVShowReviewRemoved()
		unsubscribeTVShowReviewChanged()
		unsubscribeMovieReviewRemoved()
		unsubscribeMovieReviewChanged()
	}
}
