import { CURRENT_USER_COLLECTION_PAGE } from '@/constants/paths'
import {
	IFetchedResult,
	IGeneralCollection,
	IItemCard,
	IMark,
	IReviewCard,
} from '../../interfaces'
import { getUserCollection } from '@/handlers/getUserCollection'

export const getGeneralCollectionPage = async (
	userIdFromUrl: string,
	userId: string | undefined,
	redirect: (url: string) => void
): Promise<IGeneralCollection | null> => {
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
		const generalCollection = await getUserCollection(userIdFromUrl)

		if (!generalCollection) {
			return null
		}

		return {
			collectionMovies: generalCollection.collectionMovies,
			collectionTVShows: generalCollection.collectionTVShows,
			collectionPersons: generalCollection.collectionPersons,
			allCollectionReviews: generalCollection.allCollectionReviews,
			collectionMarks: generalCollection.collectionMarks,
		}
	} catch (error) {
		throw error
	}
}
