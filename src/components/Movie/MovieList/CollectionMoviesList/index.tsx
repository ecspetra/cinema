import MovieCard from '../../MovieCard'
import { IMovieCard } from '../../../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
import Button from '@/app/components/UI/Button'
import { collectionListener, getCollectionItemsList } from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import Title from '@/app/components/UI/Title/Title'
import Loader from '@/components/Loader'

type PropsType = {
	movieList: {
		items: Array<IMovieCard>
		isMoreDataAvailable: boolean
	}
	title: string
}

const CollectionMovieList: FC<PropsType> = ({
	movieList: { items, isMoreDataAvailable },
	title,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [lastMovieId, setLastMovieId] = useState<string | undefined>(
		undefined
	)
	const [moviesToShow, setMoviesToShow] = useState<Array<IMovieCard>>([
		...items,
	])
	const [isShowMoreButton, setIsShowMoreButton] =
		useState<boolean>(isMoreDataAvailable)
	const { currentUser } = useAuth()
	const userId = currentUser?.uid

	const getMoreCollectionMovies = async () => {
		setIsLoading(true)
		const result = await getCollectionItemsList(
			userId,
			'movies',
			20,
			lastMovieId
		)
		result.items.map(item => {
			setMoviesToShow(prevState => [...prevState, item])
		})
		setIsShowMoreButton(result.isMoreDataAvailable)
		setIsLoading(false)
	}

	useEffect(() => {
		const unsubscribe = collectionListener(
			userId,
			'movies',
			moviesToShow,
			setMoviesToShow,
			setIsShowMoreButton
		)

		return () => {
			unsubscribe()
		}
	}, [moviesToShow])

	useEffect(() => {
		if (lastMovieId) getMoreCollectionMovies()
	}, [lastMovieId])

	if (!moviesToShow.length) {
		return (
			<div className='mb-16'>
				<Title>{title}</Title>
				<p>No movies yet</p>
			</div>
		)
	}

	return (
		<div className='mb-16'>
			<Title>{title}</Title>
			<div className='grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center'>
				{moviesToShow.map((item: IMovieCard) => {
					return <MovieCard key={item.id} movie={item} />
				})}
			</div>
			{isLoading && <Loader type='static' />}
			{isShowMoreButton && (
				<Button
					className='mx-auto'
					context='empty'
					onClick={() =>
						setLastMovieId(
							moviesToShow[moviesToShow.length - 1].id.toString()
						)
					}
				>
					Show more
				</Button>
			)}
		</div>
	)
}

export default CollectionMovieList
