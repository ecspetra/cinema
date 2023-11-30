import { URL_TO_FETCH_ITEM_DATA } from '@/constants/linksToFetch'

export const fetchItemData = async (
	listName: string,
	itemId: number,
	queryParam: string
) => {
	const urlToFetch = URL_TO_FETCH_ITEM_DATA.replace('{listName}', listName)
		.replace('{itemId}', itemId)
		.replace('{queryParam}', queryParam)

	const response = await fetch(urlToFetch)
	return await response.json()
}
