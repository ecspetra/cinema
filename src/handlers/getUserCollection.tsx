import { getCollectionItemsList } from '@/firebase/config'
import { getCollectionReviewsWithRepliesList } from '@/handlers/getCollectionReviewsWithRepliesList'
import { IFetchedResult, IItemCard, IMark, IReviewCard } from '../../interfaces'
import { UserCollections } from '@/constants/enum'

export const getUserCollection = async (
	userId: string
): Promise<{
	collectionMovies: IItemCard[]
	collectionTVShows: IItemCard[]
	collectionPersons: IItemCard[]
	allCollectionReviews: IReviewCard[]
	collectionMarks: IMark[]
} | null> => {
	try {
		const collectionMovies = (await getCollectionItemsList(
			userId,
			UserCollections.movie,
			5,
			null
		)) as IFetchedResult<IItemCard>
		const collectionTVShows = (await getCollectionItemsList(
			userId,
			UserCollections.tv,
			5,
			null
		)) as IFetchedResult<IItemCard>
		const collectionPersons = (await getCollectionItemsList(
			userId,
			UserCollections.person,
			5,
			null
		)) as IFetchedResult<IItemCard>
		const collectionReviews = (await getCollectionItemsList(
			userId,
			UserCollections.reviews,
			null,
			null
		)) as IFetchedResult<IReviewCard>
		const collectionReplies = (await getCollectionItemsList(
			userId,
			UserCollections.replies,
			null,
			null
		)) as IFetchedResult<IReviewCard>
		const collectionMarks = (await getCollectionItemsList(
			userId,
			UserCollections.marks,
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
			collectionMovies: collectionMovies.items,
			collectionTVShows: collectionTVShows.items,
			collectionPersons: collectionPersons.items,
			allCollectionReviews,
			collectionMarks: collectionMarks.items,
		}
	} catch (error) {
		throw error
	}
}
