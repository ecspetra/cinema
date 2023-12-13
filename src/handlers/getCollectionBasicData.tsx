import { UserCollections } from '@/constants/enum'
import { getCollectionItemsList } from '@/firebase/config'
import { CURRENT_USER_COLLECTION_PAGE } from '@/constants/paths'
import { IFetchedResult, IItemCard } from '../../interfaces'

export const getCollectionBasicData = async (
	userIdFromUrl: string,
	collectionType: UserCollections,
	userId: string | undefined,
	redirect: (url: string) => void
): Promise<IFetchedResult<IItemCard> | null> => {
	const isShowNotFoundPage =
		(userId && userIdFromUrl && userId !== userIdFromUrl) ||
		(!userId && userIdFromUrl) ||
		!userIdFromUrl
	const isLoggedIn = userId

	if (isShowNotFoundPage) {
		redirect('/404')
	}

	if (!isLoggedIn) {
		return null
	}

	try {
		const result = await getCollectionItemsList(
			userIdFromUrl,
			collectionType,
			20,
			null
		)

		if (!result.items.length) {
			redirect(CURRENT_USER_COLLECTION_PAGE.replace('{userId}', userId))
		} else {
			return result as IFetchedResult<IItemCard>
		}

		return result as IFetchedResult<IItemCard>
	} catch (error) {
		return null
	}
}
