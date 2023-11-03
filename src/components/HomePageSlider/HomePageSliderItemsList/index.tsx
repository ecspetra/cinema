import { IMovieCard, IPersonCard } from '../../../../interfaces'
import React, { FC, useEffect, useRef, useState } from 'react'
import { getMovieGenres } from '@/handlers/getMovieGenres'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import Loader from '@/components/Loader'
import { LINK_TO_FETCH_UPCOMING_MOVIE_LIST } from '@/constants/linksToFetch'
import Button from '@/app/components/UI/Button'
import moment from 'moment'
import classNames from 'classnames'

type PropsType = {
	itemsList: Array<IMovieCard>
	isMoreDataAvailable: boolean
	selectedItemId: number
	onSelectItem: React.Dispatch<React.SetStateAction<IMovieCard>>
}

const HomePageSliderItemsList: FC<PropsType> = ({
	itemsList,
	isMoreDataAvailable,
	selectedItemId,
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
		getResultsByPage(LINK_TO_FETCH_UPCOMING_MOVIE_LIST, currentPage).then(
			data => {
				setFetchedItems(data.items)
				setIsMoreItemsAvailable(data.isMoreDataAvailable)
			}
		)
	}

	useEffect(() => {
		if (currentPage > 1) getMoreItems()
	}, [currentPage])

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

	useEffect(() => {
		if (fetchedItems.length !== 0) getItems()
	}, [fetchedItems])

	useEffect(() => {
		setFetchedItems([...itemsList])
	}, [itemsList])

	const defaultItemClassNames = 'bg-gray-800 group-hover:bg-black'
	const selectedItemClassNames = 'bg-black'

	return (
		<div
			ref={containerRef}
			className='overflow-auto flex flex-col flex-none max-w-sm w-full scrollbar-hide bg-black p-4'
		>
			{itemsToShow.map((item: IMovieCard, idx: number) => {
				return (
					<Button
						key={idx}
						context='listItem'
						onClick={() => onSelectItem(item)}
						className={classNames(
							'group',
							selectedItemId === item.id &&
								'bg-amber-500 text-black'
						)}
					>
						<span
							className={classNames(
								'w-20 p-2 text-white font-black mr-4 rounded-md flex-none duration-300',
								selectedItemId === item.id
									? selectedItemClassNames
									: defaultItemClassNames
							)}
						>
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
