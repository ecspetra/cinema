import {
	getCollectionItemsList,
	getCollectionMarksList,
} from '@/firebase/config'
import { getCollectionReviewsWithRepliesList } from '@/handlers/getCollectionReviewsWithRepliesList'

export const getUserCollection = async userId => {
	const collectionMovies = await getCollectionItemsList(
		userId,
		'movie',
		5,
		null
	)
	const collectionTVShows = await getCollectionItemsList(
		userId,
		'tv',
		5,
		null
	)
	const collectionPersons = await getCollectionItemsList(
		userId,
		'person',
		5,
		null
	)
	const collectionReviews = await getCollectionItemsList(
		userId,
		'reviews',
		null,
		null
	)
	const collectionReplies = await getCollectionItemsList(
		userId,
		'replies',
		null,
		null
	)
	const collectionMarks = await getCollectionMarksList(userId)

	const reviewsWithUserReplies =
		await getCollectionReviewsWithRepliesList(collectionReplies)

	const allCollectionReviews = [
		...collectionReviews.items.filter(
			item => item.movieId !== undefined && item.id !== undefined
		),
		...reviewsWithUserReplies,
	]

	return {
		collectionMovies,
		collectionTVShows,
		collectionPersons,
		allCollectionReviews,
		collectionMarks,
	}
}
