import {
	DataSnapshot,
	onChildChanged,
	onChildRemoved,
	ref,
} from 'firebase/database'
import { database } from '@/firebase/config'

export const collectionReviewsListener = (
	collectionId: number | string,
	setItems: ([]) => void
) => {
	const tvShowReviewsRef = ref(
		database,
		`users/${collectionId}/collection/reviews/tv`
	)

	const movieReviewsRef = ref(
		database,
		`users/${collectionId}/collection/reviews/movie`
	)

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
		tvShowReviewsRef,
		onReviewRemoved
	)
	const unsubscribeTVShowReviewChanged = onChildChanged(
		tvShowReviewsRef,
		onReviewChanged
	)

	const unsubscribeMovieReviewRemoved = onChildRemoved(
		movieReviewsRef,
		onReviewRemoved
	)
	const unsubscribeMovieReviewChanged = onChildChanged(
		movieReviewsRef,
		onReviewChanged
	)

	return () => {
		unsubscribeTVShowReviewRemoved()
		unsubscribeTVShowReviewChanged()
		unsubscribeMovieReviewRemoved()
		unsubscribeMovieReviewChanged()
	}
}
