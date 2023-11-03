import { LINK_TO_FETCH_ITEM_DATA } from '@/constants/linksToFetch'

export const fetchItemData = async (
	listName: string,
	itemId: number,
	queryParam: string
) => {
	const linkToFetch = LINK_TO_FETCH_ITEM_DATA.replace('{listName}', listName)
		.replace('{itemId}', itemId)
		.replace('{queryParam}', queryParam)

	const response = await fetch(linkToFetch)
	return await response.json()
}
