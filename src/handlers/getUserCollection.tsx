import {
	getCollectionItemsList,
	getReviewsOrRepliesFromUserCollection,
} from '@/firebase/config'
import { getCollectionReviewsWithRepliesList } from '@/handlers/getCollectionReviewsWithRepliesList'
import {
	IFetchedResult,
	IGeneralCollection,
	IItemCard,
	IMark,
	IReviewCard,
} from '../../interfaces'
import { UserCollections } from '@/constants/enum'

export const getUserCollection = async (
	userId: string
): Promise<IGeneralCollection | null> => {
	try {
		const collectionMovies = (await getCollectionItemsList(
			userId,
			UserCollections.movie,
			5
		)) as IFetchedResult<IItemCard>
		const collectionTVShows = (await getCollectionItemsList(
			userId,
			UserCollections.tv,
			5
		)) as IFetchedResult<IItemCard>
		const collectionPersons = (await getCollectionItemsList(
			userId,
			UserCollections.person,
			5
		)) as IFetchedResult<IItemCard>
		const collectionMarks = (await getCollectionItemsList(
			userId,
			UserCollections.marks,
			null
		)) as IFetchedResult<IMark>
		const collectionReviews = (await getReviewsOrRepliesFromUserCollection(
			userId,
			UserCollections.reviews
		)) as IReviewCard[]
		const collectionReplies = (await getReviewsOrRepliesFromUserCollection(
			userId,
			UserCollections.replies
		)) as IReviewCard[]

		const reviewsWithUserReplies =
			await getCollectionReviewsWithRepliesList(collectionReplies)

		const allCollectionReviews = [
			...collectionReviews.filter(
				item =>
					item.reviewedItemId !== undefined && item.id !== undefined
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
