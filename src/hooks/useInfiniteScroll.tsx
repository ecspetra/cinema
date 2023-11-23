import { useEffect, RefObject, useState } from 'react'
import { getMovieGenres } from '@/handlers/getMovieGenres'
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
	const [itemsToShow, setItemsToShow] = useState([])
	const [fetchedItems, setFetchedItems] = useState([])

	const getItems = async () => {
		getMovieGenres(fetchedItems, 'movie')
			.then(data => {
				setItemsToShow(prevState => [...prevState, ...data])
			})
			.then(() => {
				setFetchedItems([])
				setIsLoading(false)
			})
	}

	const getMoreItems = async () => {
		getResultsByPage(linkToFetch, currentPage).then(data => {
			setFetchedItems(data.items)
			setIsMoreItemsAvailable(data.isMoreDataAvailable)
		})
	}

	useEffect(() => {
		if (currentPage > 1) getMoreItems()
	}, [currentPage])

	useEffect(() => {
		if (fetchedItems.length !== 0) getItems()
	}, [fetchedItems])

	useEffect(() => {
		setFetchedItems([...itemsList])
	}, [itemsList])

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
		itemsToShow,
	}
}
