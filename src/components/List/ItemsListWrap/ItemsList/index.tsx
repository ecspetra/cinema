import MovieCard from '../../../Movie/MovieCard'
import { IMovieCard, IPersonCard } from '../../../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
import { getMovieGenres } from '@/handlers/getMovieGenres'
import Button from '@/app/components/UI/Button'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import Loader from '@/components/Loader'
import PersonCard from '../../../Person/PersonList/PersonCard'

type PropsType = {
	itemsList: Array<IMovieCard> | Array<IPersonCard>
	listName: 'movie' | 'person' | 'tv'
	isMoreDataAvailable: boolean
	urlToFetchItems?: string
	onEmptyList: () => void
	isFilterable?: boolean
}

const ItemsList: FC<PropsType> = ({
	itemsList,
	listName,
	isMoreDataAvailable,
	urlToFetchItems,
	onEmptyList,
	isFilterable = false,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [itemsToShow, setItemsToShow] = useState([])
	const [fetchedItems, setFetchedItems] = useState([])
	const [isShowMoreButton, setIsShowMoreButton] =
		useState(isMoreDataAvailable)

	const getItems = () => {
		if (listName !== 'person') {
			getMovieGenres(fetchedItems, listName).then(data => {
				setItemsToShow(prevState => [...prevState, ...data])
			})
		} else setItemsToShow(prevState => [...prevState, ...fetchedItems])

		setFetchedItems([])
	}

	const getMoreItems = page => {
		setIsLoading(true)
		getResultsByPage(urlToFetchItems, page)
			.then(data => {
				if (!data.items.length) onEmptyList(true)
				setFetchedItems(data.items)
				setIsShowMoreButton(data.isMoreDataAvailable)
			})
			.then(() => {
				setIsLoading(false)
			})
	}

	const resetItems = () => {
		setItemsToShow([])
		setCurrentPage(1)

		if (isFilterable) {
			setIsShowMoreButton(false)
			getMoreItems(1)
		} else {
			setFetchedItems([...itemsList])
			setIsShowMoreButton(isMoreDataAvailable)
		}
	}

	useEffect(() => {
		if (currentPage > 1) getMoreItems(currentPage)
	}, [currentPage])

	useEffect(() => {
		if (fetchedItems.length !== 0) {
			getItems()
		}
	}, [fetchedItems])

	useEffect(() => {
		resetItems()
	}, [itemsList, urlToFetchItems])

	return (
		<>
			<div className='grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center'>
				{itemsToShow.map((item: IMovieCard | IPersonCard) => {
					if (listName !== 'person') {
						return (
							<MovieCard
								key={item.id}
								item={item}
								isTVShow={listName === 'tv'}
							/>
						)
					} else return <PersonCard key={item.id} item={item} />
				})}
			</div>
			{isLoading && <Loader type='static' className='mb-4' />}
			{isShowMoreButton && (
				<Button
					className='mx-auto'
					context='empty'
					onClick={() => setCurrentPage(prevState => prevState + 1)}
				>
					Show more
				</Button>
			)}
		</>
	)
}

export default ItemsList
