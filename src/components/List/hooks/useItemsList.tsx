import { useModal } from '@/context/ModalProvider'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IItemCard } from '../../../../interfaces'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import { showErrorNotification } from '@/handlers/handleModals'

const useItemsList = (
	itemsList: IItemCard[],
	itemsListConfig: {
		onEmptyList: Dispatch<SetStateAction<boolean>>
		urlToFetchItems: string
		isMoreDataAvailable: boolean
		isFilterable: boolean
	}
) => {
	const { onEmptyList, urlToFetchItems, isMoreDataAvailable, isFilterable } =
		itemsListConfig
	const { showModal } = useModal()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [itemsToShow, setItemsToShow] = useState<IItemCard[]>([])
	const [isShowMoreButton, setIsShowMoreButton] =
		useState<boolean>(isMoreDataAvailable)

	const showMore = () => {
		setCurrentPage(prevState => prevState + 1)
	}

	const getMoreItems = (page: number) => {
		setIsLoading(true)
		getResultsByPage(urlToFetchItems, page)
			.then(data => {
				let newItems: IItemCard[] = []
				if (!data.items.length) onEmptyList(true)

				data.items.map(item => {
					const isItemExistsInList = itemsToShow.find(
						existingItem => existingItem.id === item.id
					)

					if (!isItemExistsInList) {
						newItems.push(item)
					}
				})

				if (newItems.length !== 0) {
					setItemsToShow(prevState => [...prevState, ...newItems])
				} else {
					setItemsToShow(prevState => [...prevState, ...itemsToShow])
				}

				setIsShowMoreButton(data.isMoreDataAvailable)
			})
			.catch(() => {
				showErrorNotification(showModal, 'An error has occurred')
				onEmptyList(true)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const resetItems = () => {
		setItemsToShow([])
		setCurrentPage(1)
		setIsShowMoreButton(isFilterable ? false : isMoreDataAvailable)
		getMoreItems(1)
	}

	useEffect(() => {
		if (currentPage > 1) getMoreItems(currentPage)
	}, [currentPage])

	useEffect(() => {
		resetItems()
	}, [itemsList, urlToFetchItems])

	return { itemsToShow, isLoading, isShowMoreButton, showMore }
}

export default useItemsList
