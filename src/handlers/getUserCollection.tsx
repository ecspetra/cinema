import { getCollectionItemsList } from '@/firebase/config'
import { getCollectionReviewsWithRepliesList } from '@/handlers/getCollectionReviewsWithRepliesList'
import { IFetchedResult, IItemCard, IMark, IReviewCard } from '../../interfaces'

export const getUserCollection = async (userId: string) => {
	const collectionMovies = (await getCollectionItemsList(
		userId,
		'movie',
		5,
		null
	)) as IFetchedResult<IItemCard>
	const collectionTVShows = (await getCollectionItemsList(
		userId,
		'tv',
		5,
		null
	)) as IFetchedResult<IItemCard>
	const collectionPersons = (await getCollectionItemsList(
		userId,
		'person',
		5,
		null
	)) as IFetchedResult<IItemCard>
	const collectionReviews = (await getCollectionItemsList(
		userId,
		'reviews',
		null,
		null
	)) as IFetchedResult<IReviewCard>
	const collectionReplies = (await getCollectionItemsList(
		userId,
		'replies',
		null,
		null
	)) as IFetchedResult<IReviewCard>
	const collectionMarks = (await getCollectionItemsList(
		userId,
		'marks',
		null,
		null
	)) as IFetchedResult<IMark>

	const reviewsWithUserReplies =
		await getCollectionReviewsWithRepliesList(collectionReplies)

	const allCollectionReviews = [
		...collectionReviews.items.filter(
			item => item.movieId !== undefined && item.id !== undefined
		),
		...(reviewsWithUserReplies as IReviewCard[]),
	]

	return {
		collectionMovies,
		collectionTVShows,
		collectionPersons,
		allCollectionReviews,
		collectionMarks: collectionMarks.items,
	}
}
