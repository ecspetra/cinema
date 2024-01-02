import {} from '@/firebase/config'
import { getCollectionReviewsWithRepliesList } from '@/handlers/getCollectionReviewsWithRepliesList'
import {
	IFetchedResult,
	IGeneralCollection,
	IItemCard,
	IMark,
	IReviewCard,
} from '../../interfaces'
import { UserCollections } from '@/constants/enum'
import { getCollectionItemsList } from '@/firebase/handlers/userCollectionHandlers/getCollectionItemsList'
import { getReviewsOrRepliesFromUserCollection } from '@/firebase/handlers/userCollectionHandlers/getReviewsOrRepliesFromUserCollection'

export const getUserCollection = async (
	collectionOwnerId: string
): Promise<IGeneralCollection | null> => {
	try {
		const collectionMovies = (await getCollectionItemsList(
			collectionOwnerId,
			UserCollections.movie,
			5
		)) as IFetchedResult<IItemCard>
		const collectionTVShows = (await getCollectionItemsList(
			collectionOwnerId,
			UserCollections.tv,
			5
		)) as IFetchedResult<IItemCard>
		const collectionPersons = (await getCollectionItemsList(
			collectionOwnerId,
			UserCollections.person,
			5
		)) as IFetchedResult<IItemCard>
		const collectionMarks = (await getCollectionItemsList(
			collectionOwnerId,
			UserCollections.marks,
			null
		)) as IFetchedResult<IMark>
		const collectionReviews = (await getReviewsOrRepliesFromUserCollection(
			collectionOwnerId,
			UserCollections.reviews
		)) as IReviewCard[]
		const collectionReplies = (await getReviewsOrRepliesFromUserCollection(
			collectionOwnerId,
			UserCollections.replies
		)) as IReviewCard[]

		const reviewsWithUserReplies =
			await getCollectionReviewsWithRepliesList(
				collectionOwnerId,
				collectionReplies
			)

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
