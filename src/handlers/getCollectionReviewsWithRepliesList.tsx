import { fetchItemData } from '@/handlers/fetchItemData'
import { IFetchedResult, IReviewCard } from '../../interfaces'

export const getCollectionReviewsWithRepliesList = (
	collectionReplies: IFetchedResult<IReviewCard>
) => {
	return new Promise(async resolve => {
		let reviews: IReviewCard[]

		const repliesArray: IReviewCard[] =
			collectionReplies.items as IReviewCard[]

		const filteredReplies = repliesArray.filter(
			(item: IReviewCard) =>
				item.movieId !== undefined && item.reviewId !== undefined
		)

		const addedReviewIds = new Set<string>()

		const fetchMovieReviews = async (movieId: number, reviewId: string) => {
			const result = await fetchItemData('movie', movieId, '/reviews')
			const fetchedReview = result.results.find(
				(item: IReviewCard) => item.id === reviewId
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

		const fetchPromises = filteredReplies.map((item: IReviewCard) => {
			if (item.movieId !== undefined && item.reviewId !== undefined) {
				return fetchMovieReviews(item.movieId, item.reviewId)
			}
		})

		const resolvedReviews = await Promise.all(fetchPromises)

		reviews = resolvedReviews.filter(
			(review: IReviewCard) => review !== null
		)

		resolve(reviews)
	})
}
