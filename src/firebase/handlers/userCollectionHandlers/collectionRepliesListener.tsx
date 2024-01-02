import {
	DataSnapshot,
	get,
	onChildRemoved,
	query,
	ref,
} from 'firebase/database'
import { UserCollections } from '@/constants/enum'
import { database } from '@/firebase/config'

export const collectionRepliesListener = (
	userId: string,
	collectionOwnerId: string,
	setItems: ([]) => void
) => {
	const tvShowRepliesRef = ref(
		database,
		`users/${collectionOwnerId}/collection/replies/tv`
	)

	const movieRepliesRef = ref(
		database,
		`users/${collectionOwnerId}/collection/replies/movie`
	)

	const tvShowReviewsRef = ref(
		database,
		`users/${collectionOwnerId}/collection/reviews/tv`
	)

	const movieReviewsRef = ref(
		database,
		`users/${collectionOwnerId}/collection/reviews/movie`
	)

	const onReplyRemoved = async (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()
		let allRepliesSnapshot
		let allReplies
		let allReviewsSnapshot
		let allReviews

		if (removedItem.reviewedItemCollectionType === UserCollections.movie) {
			allRepliesSnapshot = await get(query(movieRepliesRef))
			allReplies = Object.values(allRepliesSnapshot.val() || {})
			allReviewsSnapshot = await get(query(movieReviewsRef))
			allReviews = Object.values(allReviewsSnapshot.val() || {})
		} else {
			allRepliesSnapshot = await get(query(tvShowRepliesRef))
			allReplies = Object.values(allRepliesSnapshot.val() || {})
			allReviewsSnapshot = await get(query(tvShowReviewsRef))
			allReviews = Object.values(allReviewsSnapshot.val() || {})
		}

		const review = allReviews.find(item => item.id === removedItem.reviewId)

		const isLastReplyInReview = !allReplies.some(
			item => item.reviewId === removedItem.reviewId
		)
		const isCurrentUserReview = review && review.authorId === userId
		const isReviewFromDefaultReviews = !review
		const isCurrentUserCollection = collectionOwnerId === userId

		if (
			(isLastReplyInReview &&
				!isCurrentUserReview &&
				isCurrentUserCollection) ||
			isReviewFromDefaultReviews
		) {
			setItems(prevItems =>
				prevItems.filter(item => item.id !== removedItem.reviewId)
			)
		}
	}

	const unsubscribeTVShowReplyRemoved = onChildRemoved(
		tvShowRepliesRef,
		onReplyRemoved
	)

	const unsubscribeMovieReplyRemoved = onChildRemoved(
		movieRepliesRef,
		onReplyRemoved
	)

	return () => {
		unsubscribeTVShowReplyRemoved()
		unsubscribeMovieReplyRemoved()
	}
}
