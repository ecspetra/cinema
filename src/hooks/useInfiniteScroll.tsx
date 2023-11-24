import { useEffect, RefObject, useState } from 'react'
import { getResultsByPage } from '@/handlers/getResultsByPage'

export const useInfiniteScroll = (
	containerRef: RefObject<HTMLElement>,
	itemsList: Array<any>,
	isMoreDataAvailable: boolean,
	linkToFetch: string
) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isMoreItemsAvailable, setIsMoreItemsAvailable] =
		useState<boolean>(isMoreDataAvailable)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [items, setItems] = useState([])

	const getMoreItems = async () => {
		getResultsByPage(linkToFetch, currentPage).then(data => {
			setItems(prevState => [...prevState, ...data.items])
			setIsMoreItemsAvailable(data.isMoreDataAvailable)
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
	}, [containerRef, isMoreItemsAvailable])

	return {
		isLoading,
		items,
	}
}
