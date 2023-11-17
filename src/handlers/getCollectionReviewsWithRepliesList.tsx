import { fetchItemData } from '@/handlers/fetchItemData'

export const getCollectionReviewsWithRepliesList = collectionReplies => {
	return new Promise(async resolve => {
		let reviews = []
		let replies = collectionReplies.items.filter(
			item => item.movieId !== undefined && item.reviewId !== undefined
		)

		const addedReviewIds = new Set()

		const fetchMovieReviews = async (movieId: number, reviewId: string) => {
			const result = await fetchItemData('movie', movieId, '/reviews')
			const fetchedReview = result.results.find(
				item => item.id === reviewId
			)

			if (!addedReviewIds.has(reviewId) && fetchedReview) {
				const review = {
					...fetchedReview,
					movieId: movieId,
				}

				addedReviewIds.add(reviewId)

				return review
			}

			return null
		}

		const fetchPromises = replies.map(item => {
			return fetchMovieReviews(item.movieId, item.reviewId)
		})

		const resolvedReviews = await Promise.all(fetchPromises)

		reviews = resolvedReviews.filter(review => review !== null)

		resolve(reviews)
	})
}
