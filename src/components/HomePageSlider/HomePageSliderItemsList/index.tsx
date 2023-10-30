import { IMovieCard, IPersonCard } from '../../../../interfaces'
import React, { FC, useEffect, useRef, useState } from 'react'
import { getMovieGenres } from '@/handlers/getMovieGenres'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import Loader from '@/components/Loader'
import { LINK_TO_FETCH_UPCOMING_MOVIE_LIST } from '@/constants/linksToFetch'
import Button from '@/app/components/UI/Button'
import moment from 'moment'

type PropsType = {
	itemsList: Array<IMovieCard>
	isMoreDataAvailable: boolean
	onSelectItem: React.Dispatch<React.SetStateAction<IMovieCard>>
}

const HomePageSliderItemsList: FC<PropsType> = ({
	itemsList,
	isMoreDataAvailable,
	onSelectItem,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isMoreItemsAvailable, setIsMoreItemsAvailable] =
		useState<boolean>(isMoreDataAvailable)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [itemsToShow, setItemsToShow] = useState([])
	const [fetchedItems, setFetchedItems] = useState([])

	const getItems = async () => {
		getMovieGenres(fetchedItems)
			.then(data => {
				setItemsToShow(prevState => [...prevState, ...data])
			})
			.then(() => {
				setFetchedItems([])
				setIsLoading(false)
			})
	}

	const getMoreItems = async () => {
		getResultsByPage(LINK_TO_FETCH_UPCOMING_MOVIE_LIST, currentPage).then(
			data => {
				setFetchedItems(data.items)
				setIsMoreItemsAvailable(data.isMoreDataAvailable)
			}
		)
	}

	useEffect(() => {
		if (currentPage > 1 && isMoreItemsAvailable) getMoreItems()
	}, [currentPage])

	useEffect(() => {
		const listRef = containerRef.current

		const handleScroll = () => {
			if (
				listRef &&
				listRef.scrollHeight - listRef.scrollTop ===
					listRef.clientHeight &&
				!isLoading
			) {
				setIsLoading(true)
				setCurrentPage(prevPage => prevPage + 1)
			}
		}

		if (listRef) {
			listRef.addEventListener('scroll', handleScroll)
		}

		return () => {
			if (listRef) {
				listRef.removeEventListener('scroll', handleScroll)
			}
		}
	}, [containerRef])

	useEffect(() => {
		if (fetchedItems.length !== 0) getItems()
	}, [fetchedItems])

	useEffect(() => {
		setFetchedItems([...itemsList])
	}, [itemsList])

	return (
		<div ref={containerRef} className='overflow-auto flex flex-col'>
			{itemsToShow.map((item: IMovieCard, idx: number) => {
				return (
					<Button
						key={idx}
						context='listItem'
						onClick={() => onSelectItem(item)}
						className='group'
					>
						<span className='w-20 p-2 text-amber-500 font-black mr-4 rounded-md bg-amber-900/50 flex-none group-hover:bg-transparent group-hover:text-white duration-300'>
							{moment(item.release_date).format('D MMM')}
						</span>
						<span className='font-semibold text-left'>
							{item.title}
						</span>
					</Button>
				)
			})}
			{isLoading && <Loader type='static' className='mb-4' />}
		</div>
	)
}

export default HomePageSliderItemsList
