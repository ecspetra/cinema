import { CURRENT_USER_COLLECTION_PAGE } from '@/constants/paths'
import { IFetchedResult, IItemCard, IMark, IReviewCard } from '../../interfaces'
import { getUserCollection } from '@/handlers/getUserCollection'

export const getCollectionGeneralPage = async (
	userIdFromUrl: string,
	userId: string | undefined,
	redirect: (url: string) => void
): Promise<{
	collectionMovies: IFetchedResult<IItemCard>
	collectionTVShows: IFetchedResult<IItemCard>
	collectionPersons: IFetchedResult<IItemCard>
	allCollectionReviews: IReviewCard[]
	collectionMarks: IMark[]
} | null> => {
	const isUserIdNotPresented = !userId

	if (isUserIdNotPresented) {
		return null
	}

	const isUserIdFromUrlNotPresented = !userIdFromUrl

	if (isUserIdFromUrlNotPresented) {
		redirect(CURRENT_USER_COLLECTION_PAGE.replace('{userId}', userId))
	}

	const areUserIdsPresentedButDifferent = userId !== userIdFromUrl

	if (areUserIdsPresentedButDifferent) {
		redirect('/404')
	}

	try {
		const userCollection = await getUserCollection(userIdFromUrl)

		if (!userCollection) {
			return null
		}

		return {
			collectionMovies: userCollection.collectionMovies,
			collectionTVShows: userCollection.collectionTVShows,
			collectionPersons: userCollection.collectionPersons,
			allCollectionReviews: userCollection.allCollectionReviews,
			collectionMarks: userCollection.collectionMarks,
		}
	} catch (error) {
		return null
	}
}
