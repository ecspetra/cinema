import { API_KEY } from '@/constants/linksToFetch'

export const getCollectionReviewsWithRepliesList = collectionReplies => {
	return new Promise(async resolve => {
		let reviews = []
		const addedReviewIds = new Set()

		const fetchMovieReviews = async (movieId: number, reviewId: string) => {
			const linkToFetch = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
			const response = await fetch(linkToFetch)
			const result = await response.json()
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

		const fetchPromises = collectionReplies.items.map(item => {
			return fetchMovieReviews(item.movieId, item.reviewId)
		})

		const resolvedReviews = await Promise.all(fetchPromises)

		reviews = resolvedReviews.filter(review => review !== null)

		resolve(reviews)
	})
}
