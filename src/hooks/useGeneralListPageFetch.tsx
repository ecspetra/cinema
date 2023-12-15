import { useEffect, useState } from 'react'
import { showErrorNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import { IFetchedResult, IItemCard } from '../../interfaces'
import { getResultsByPage } from '@/handlers/getResultsByPage'

const useGeneralListPageFetch = (
	itemsListFromProps: IFetchedResult<IItemCard>,
	urlToFetch: string
) => {
	const { showModal } = useModal()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [items, setItems] = useState<IFetchedResult<IItemCard> | null>(null)

	useEffect(() => {
		setIsLoading(true)

		if (!itemsListFromProps) {
			getResultsByPage(urlToFetch, 1)
				.then(data => {
					setItems(data)
				})
				.catch(() => {
					showErrorNotification(showModal, 'An error has occurred')
				})
				.finally(() => {
					setIsLoading(false)
				})
		} else setItems(itemsListFromProps)
	}, [itemsListFromProps])

	return {
		items,
		isLoading,
	}
}

export default useGeneralListPageFetch
