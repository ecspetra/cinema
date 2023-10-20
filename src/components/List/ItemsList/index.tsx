import MovieCard from '../../Movie/MovieCard'
import { IMovieCard, IPersonCard } from '../../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
import { getMovieGenres } from '@/handlers/getMovieGenres'
import Button from '@/app/components/UI/Button'
import Title from '@/app/components/UI/Title/Title'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import Loader from '@/components/Loader'
import PersonCard from '../../Person/PersonList/PersonCard'
import EmptyList from '@/components/List/EmptyList'

type PropsType = {
	itemsList: Array<IMovieCard>
	listName: 'movies' | 'persons'
	title: string
	isMoreDataAvailable: boolean
	linkToFetchItems?: string
}

const ItemsList: FC<PropsType> = ({
	itemsList,
	listName,
	title,
	isMoreDataAvailable,
	linkToFetchItems,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [itemsToShow, setItemsToShow] = useState([])
	const [fetchedItems, setFetchedItems] = useState([])
	const [isShowMoreButton, setIsShowMoreButton] =
		useState(isMoreDataAvailable)

	const getItems = async () => {
		if (listName === 'movies') {
			getMovieGenres(fetchedItems).then(data => {
				setItemsToShow(prevState => [...prevState, ...data])
			})
		} else setItemsToShow(prevState => [...prevState, ...fetchedItems])

		setFetchedItems([])
	}

	const getMoreDefaultMovies = async () => {
		setIsLoading(true)
		getResultsByPage(linkToFetchItems, currentPage)
			.then(data => {
				setFetchedItems(data.items)
				setIsShowMoreButton(!!data.isMoreDataAvailable)
			})
			.then(() => {
				setIsLoading(false)
			})
	}

	const resetItems = async () => {
		setCurrentPage(1)
		setItemsToShow([])
		setFetchedItems([...itemsList])
		setIsShowMoreButton(isMoreDataAvailable)
	}

	useEffect(() => {
		if (currentPage > 1) getMoreDefaultMovies()
	}, [currentPage])

	useEffect(() => {
		if (fetchedItems.length !== 0) getItems()
	}, [fetchedItems])

	useEffect(() => {
		resetItems()
	}, [itemsList])

	if (!itemsToShow.length) {
		return <EmptyList title={title} />
	}

	return (
		<div className='mb-16'>
			<Title>{title}</Title>
			<div className='grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center'>
				{itemsToShow.map((item: IMovieCard | IPersonCard) => {
					if (listName === 'movies') {
						return <MovieCard key={item.id} movie={item} />
					} else return <PersonCard key={item.id} person={item} />
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
		</div>
	)
}

export default ItemsList
