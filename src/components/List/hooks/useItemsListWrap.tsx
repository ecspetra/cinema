import { useEffect, useState } from 'react'
import { SortByOption } from '@/constants/enum'
import { IItemCard } from '../../../../interfaces'

const useItemsListWrap = (
	itemsList: IItemCard[],
	itemsListConfig: { urlToFetchItems: string; isSortable: boolean }
) => {
	const { urlToFetchItems, isSortable } = itemsListConfig
	const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
	const [urlToFetch, setUrlToFetch] = useState<string>(urlToFetchItems)
	const [isShowEmptyList, setIsShowEmptyList] = useState<boolean>(
		!itemsList.length
	)
	const defaultSortValue = isSortable
		? new URLSearchParams(urlToFetchItems).get('sort_by')
		: undefined

	const handleSortChange = (value: SortByOption) => {
		const updatedLinkToFetch = urlToFetch.replace(
			/(sort_by=)[^&]*/,
			`$1${value}`
		)
		setUrlToFetch(updatedLinkToFetch)
	}

	useEffect(() => {
		setUrlToFetch(urlToFetchItems)

		if (!isFirstRender) {
			setIsShowEmptyList(false)
		} else {
			setIsFirstRender(false)
		}
	}, [urlToFetchItems])

	return {
		defaultSortValue,
		urlToFetch,
		isShowEmptyList,
		handleSortChange,
		setIsShowEmptyList,
	}
}

export default useItemsListWrap
