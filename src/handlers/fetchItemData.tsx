import { URL_TO_FETCH_ITEM_DATA } from '@/constants/linksToFetch'
import { UserCollections } from '@/constants/enum'

export const fetchItemData = async (
	collectionType:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
		| UserCollections.reviews
		| UserCollections.replies
		| UserCollections.marks,
	itemId: number | string,
	queryParam: string
): Promise<any> => {
	try {
		const urlToFetch = URL_TO_FETCH_ITEM_DATA.replace(
			'{collectionType}',
			collectionType
		)
			.replace('{itemId}', itemId.toString())
			.replace('{queryParam}', queryParam)

		const response = await fetch(urlToFetch)

		if (!response.ok) {
			throw `Failed to fetch`
		}

		return await response.json()
	} catch (error) {
		throw error
	}
}
