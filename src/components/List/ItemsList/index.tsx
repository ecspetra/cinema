import MovieCard from '../../Movie/MovieCard'
import { IMovieCard, IPersonCard } from '../../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
import { getMovieGenres } from '@/handlers/getMovieGenres'
import Button from '@/app/components/UI/Button'
import Title from '@/app/components/UI/Title/Title'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import Loader from '@/components/Loader'
import PersonCard from '@/components/Person/PersonCard'

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
	const [fetchedItems, setFetchedItems] = useState<Array<IMovieCard>>([
		...itemsList,
	])
	const [itemsToShow, setItemsToShow] = useState([])
	const [isShowMoreButton, setIsShowMoreButton] =
		useState(isMoreDataAvailable)

	const getMoreDefaultMovies = async () => {
		setIsLoading(true)
		getResultsByPage(linkToFetchItems, currentPage).then(data => {
			setFetchedItems(prevState => [...prevState, ...data.items])
			setIsShowMoreButton(!!data.isMoreDataAvailable)
			setIsLoading(false)
		})
	}

	useEffect(() => {
		if (fetchedItems.length !== 0) {
			fetchedItems.map(item => {
				if (listName === 'movies') {
					getMovieGenres(item).then(item => {
						setItemsToShow(prevState => [...prevState, item])
					})
				} else {
					setItemsToShow(prevState => [...prevState, item])
				}
			})
			setFetchedItems([])
		}
	}, [fetchedItems])

	useEffect(() => {
		if (currentPage > 1) getMoreDefaultMovies()
	}, [currentPage])

	if (!itemsToShow.length) {
		return (
			<div className='mb-16'>
				<Title>{title}</Title>
				<p>No items yet</p>
			</div>
		)
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
			{isLoading && <Loader type='static' />}
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
