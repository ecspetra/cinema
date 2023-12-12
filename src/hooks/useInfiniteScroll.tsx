import { useEffect, RefObject, useState } from 'react'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import { IItemCard } from '../../interfaces'

export const useInfiniteScroll = (
	containerRef: RefObject<HTMLElement>,
	itemsList: IItemCard[],
	isMoreDataAvailable: boolean,
	urlToFetch: string
) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isMoreItemsAvailable, setIsMoreItemsAvailable] =
		useState<boolean>(isMoreDataAvailable)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [items, setItems] = useState<IItemCard[]>([])

	const getMoreItems = async () => {
		if (currentPage === 1) setItems([])

		getResultsByPage(urlToFetch, currentPage)
			.then(data => {
				setItems(prevState => [...prevState, ...data.items])
				setIsMoreItemsAvailable(data.isMoreDataAvailable)
				setIsLoading(false)
			})
			.catch(() => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		if (currentPage > 1) getMoreItems()
	}, [currentPage])

	useEffect(() => {
		setItems([...itemsList])
	}, [itemsList])

	useEffect(() => {
		setIsMoreItemsAvailable(isMoreDataAvailable)
	}, [isMoreDataAvailable])

	useEffect(() => {
		setCurrentPage(1)
		setIsMoreItemsAvailable(true)
	}, [urlToFetch])

	useEffect(() => {
		const itemsContainer = containerRef.current

		const handleScroll = () => {
			if (
				itemsContainer &&
				itemsContainer.scrollHeight - itemsContainer.scrollTop ===
					itemsContainer.clientHeight &&
				!isLoading &&
				isMoreItemsAvailable
			) {
				setIsLoading(true)
				setCurrentPage(prevPage => prevPage + 1)
			}
		}

		if (itemsContainer) {
			itemsContainer.addEventListener('scroll', handleScroll)
		}

		return () => {
			if (itemsContainer) {
				itemsContainer.removeEventListener('scroll', handleScroll)
			}
		}
	}, [containerRef, isMoreItemsAvailable, isLoading])

	return {
		isLoading,
		items,
	}
}
