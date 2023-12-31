import { fetchItemData } from '@/handlers/fetchItemData'
import { IFetchedResult, IReviewCard } from '../../interfaces'
import { UserCollections } from '@/constants/enum'

export const getCollectionReviewsWithRepliesList = (
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
				if (
					item.reviewedItemId !== undefined &&
					item.reviewId !== undefined &&
					item.reviewedItemCollectionType === UserCollections.movie
				) {
					return fetchMovieOrTVShowReviews(
						item.reviewedItemId,
						item.reviewId,
						UserCollections.movie
					)
				}
			}
		)

		const fetchTVShowReviewPromises = filteredReplies.map(
			(item: IReviewCard) => {
				if (
					item.reviewedItemId !== undefined &&
					item.reviewId !== undefined &&
					item.reviewedItemCollectionType === UserCollections.tv
				) {
					return fetchMovieOrTVShowReviews(
						item.reviewedItemId,
						item.reviewId,
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
