import { UserCollections } from '@/constants/enum'
import { getCollectionItemsList } from '@/firebase/config'
import { CURRENT_USER_COLLECTION_PAGE } from '@/constants/paths'
import { IFetchedResult, IItemCard } from '../../interfaces'

export const getCollectionTypePage = async (
	userIdFromUrl: string,
	collectionType: UserCollections,
	userId: string | undefined,
	redirect: (url: string) => void
): Promise<IFetchedResult<IItemCard> | null> => {
	const areBothIdsNotPresented = !userId && !userIdFromUrl

	if (areBothIdsNotPresented) {
		return null
	}

	const isOneOfIdsNotPresented = !userId || !userIdFromUrl
	const areUserIdsPresentedButDifferent =
		userId && userIdFromUrl && userId !== userIdFromUrl

	const isShowNotFoundPage =
		areUserIdsPresentedButDifferent || isOneOfIdsNotPresented

	if (isShowNotFoundPage) {
		redirect('/404')
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
