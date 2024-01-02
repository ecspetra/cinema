import { fetchItemData } from '@/handlers/fetchItemData'
import { IReviewCard } from '../../interfaces'
import { UserCollections } from '@/constants/enum'
import { getReviewFromAnotherUserCollection } from '@/firebase/handlers/reviewHandlers/getReviewFromAnotherUserCollection'

export const getCollectionReviewsWithRepliesList = (
	collectionOwnerId: string,
	collectionReplies: IReviewCard[]
) => {
	return new Promise(async resolve => {
		let reviews: IReviewCard[]

		const filteredReplies = collectionReplies.filter(
			item =>
				item.reviewedItemId !== undefined && item.reviewId !== undefined
		)

		const addedReviewIds = new Set<string>()

		const fetchMovieOrTVShowReviews = async (
			reviewedItemId: number,
			reviewId: string,
			collectionType: UserCollections.movie | UserCollections.tv
		) => {
			const result = await fetchItemData(
				collectionType,
				reviewedItemId,
				'/reviews'
			)
			const fetchedReview = result.results.find(
				(item: IReviewCard) => item.id === reviewId
			)

			if (!addedReviewIds.has(reviewId) && fetchedReview) {
				const review = {
					...fetchedReview,
					reviewedItemId: reviewedItemId,
					reviewedItemCollectionType: collectionType,
				}

				addedReviewIds.add(reviewId)

				return review
			}

			return null
		}

		const fetchMovieReviewPromises = filteredReplies.map(
			(item: IReviewCard) => {
				const isReviewFromDefaultReviews = !item.reviewAuthorId
				const isReviewsOwnerReview =
					item.reviewAuthorId === collectionOwnerId
				const isMovieReview =
					item.reviewedItemCollectionType === UserCollections.movie

				if (isMovieReview && !isReviewsOwnerReview) {
					return isReviewFromDefaultReviews
						? fetchMovieOrTVShowReviews(
								item.reviewedItemId!,
								item.reviewId!,
								UserCollections.movie
						  )
						: getReviewFromAnotherUserCollection(
								item.reviewAuthorId!,
								item.reviewId!,
								UserCollections.movie
						  )
				}
			}
		)

		const fetchTVShowReviewPromises = filteredReplies.map(
			(item: IReviewCard) => {
				const isReviewFromDefaultReviews = !item.reviewAuthorId
				const isReviewsOwnerReview =
					item.reviewAuthorId === collectionOwnerId
				const isTVShowReview =
					item.reviewedItemCollectionType === UserCollections.tv

				if (isTVShowReview && !isReviewsOwnerReview) {
					return isReviewFromDefaultReviews
						? fetchMovieOrTVShowReviews(
								item.reviewedItemId!,
								item.reviewId!,
								UserCollections.tv
						  )
						: getReviewFromAnotherUserCollection(
								item.reviewAuthorId!,
								item.reviewId!,
								UserCollections.tv
						  )
				}
			}
		)

		const resolvedMovieReviews = await Promise.all(fetchMovieReviewPromises)
		const resolvedTVShowReviews = await Promise.all(
			fetchTVShowReviewPromises
		)

		const movieReviews = resolvedMovieReviews.filter(
			(review: IReviewCard) => review !== null && review !== undefined
		)
		const tvShowReviews = resolvedTVShowReviews.filter(
			(review: IReviewCard) => review !== null && review !== undefined
		)

		reviews = [...movieReviews, ...tvShowReviews]

		resolve(reviews.filter(item => item !== undefined))
	})
}
