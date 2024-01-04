import {
	DataSnapshot,
	get,
	onChildRemoved,
	query,
	ref,
} from 'firebase/database'
import { UserCollections } from '@/constants/enum'
import { database } from '@/firebase/config'
import { Dispatch, SetStateAction } from 'react'
import { IReviewItemCard } from '../../../../interfaces'

export const collectionRepliesListener = (
	userId: string,
	collectionOwnerId: string,
	setItems: Dispatch<SetStateAction<IReviewItemCard[]>>
) => {
	const tvShowRepliesCollectionPath = `users/${collectionOwnerId}/collection/replies/tv`
	const tvShowReviewsCollectionPath = `users/${collectionOwnerId}/collection/reviews/tv`
	const movieRepliesCollectionPath = `users/${collectionOwnerId}/collection/replies/movie`
	const movieReviewsCollectionPath = `users/${collectionOwnerId}/collection/reviews/movie`
	const tvShowRepliesCollectionRef = ref(
		database,
		tvShowRepliesCollectionPath
	)
	const tvShowReviewsCollectionRef = ref(
		database,
		tvShowReviewsCollectionPath
	)
	const movieRepliesCollectionRef = ref(database, movieRepliesCollectionPath)
	const movieReviewsCollectionRef = ref(database, movieReviewsCollectionPath)

	const onReplyRemoved = async (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()
		let allRepliesSnapshot
		let allReplies: IReviewItemCard[] = []
		let allReviewsSnapshot
		let allReviews: IReviewItemCard[] = []

		if (removedItem.reviewedItemCollectionType === UserCollections.movie) {
			allRepliesSnapshot = await get(query(movieRepliesCollectionRef))
			allReplies = Object.values(allRepliesSnapshot.val() || {})
			allReviewsSnapshot = await get(query(movieReviewsCollectionRef))
			allReviews = Object.values(allReviewsSnapshot.val() || {})
		} else {
			allRepliesSnapshot = await get(query(tvShowRepliesCollectionRef))
			allReplies = Object.values(allRepliesSnapshot.val() || {})
			allReviewsSnapshot = await get(query(tvShowReviewsCollectionRef))
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
		tvShowRepliesCollectionRef,
		onReplyRemoved
	)

	const unsubscribeMovieReplyRemoved = onChildRemoved(
		movieRepliesCollectionRef,
		onReplyRemoved
	)

	return () => {
		unsubscribeTVShowReplyRemoved()
		unsubscribeMovieReplyRemoved()
	}
}
