import { URL_TO_FETCH_ITEM_DATA } from '@/constants/linksToFetch'

export const fetchItemData = async (
	collectionType: string,
	itemId: number,
	queryParam: string
): Promise<any> => {
	const urlToFetch = URL_TO_FETCH_ITEM_DATA.replace(
		'{collectionType}',
		collectionType
	)
		.replace('{itemId}', itemId.toString())
		.replace('{queryParam}', queryParam)

	const response = await fetch(urlToFetch)
	return await response.json()
}
