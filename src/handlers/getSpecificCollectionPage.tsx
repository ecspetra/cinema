import { UserCollections } from '@/constants/enum'
import { getCollectionItemsList } from '@/firebase/config'
import { CURRENT_USER_COLLECTION_PAGE } from '@/constants/paths'
import { IFetchedResult, IItemCard } from '../../interfaces'

export const getSpecificCollectionPage = async (
	userIdFromUrl: string,
	collectionType: UserCollections,
	userId: string | undefined,
	redirect: (url: string) => void
): Promise<IFetchedResult<IItemCard> | null> => {
	const areBothIdsNotPresented = !userId && !userIdFromUrl

	if (areBothIdsNotPresented) {
		redirect('/404')
	}

	const isOneOfIdsNotPresented = !userId || !userIdFromUrl
	const areUserIdsPresentedButDifferent =
		userId && userIdFromUrl && userId !== userIdFromUrl

	const isRedirectToGeneralCollectionPage =
		areUserIdsPresentedButDifferent || isOneOfIdsNotPresented

	if (isRedirectToGeneralCollectionPage) {
		redirect(CURRENT_USER_COLLECTION_PAGE.replace('{userId}', userId!))
	}

	try {
		const collectionItemsList = await getCollectionItemsList(
			userIdFromUrl,
			collectionType,
			20,
			null
		)
		const isEmptyCollectionTypePage = !collectionItemsList.items.length

		if (isEmptyCollectionTypePage) {
			redirect(CURRENT_USER_COLLECTION_PAGE.replace('{userId}', userId!))
		}
		return collectionItemsList as IFetchedResult<IItemCard>
	} catch (error) {
		return null
	}
}
