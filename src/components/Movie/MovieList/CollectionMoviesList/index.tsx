import MovieCard from '../../MovieCard'
import { IMovieCard } from '../../../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
import Button from '@/app/components/UI/Button'
import { getCollectionItemsList } from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import Title from '@/app/components/UI/Title/Title'

type PropsType = {
	movieList: {
		movies: Array<IMovieCard>
		isMoreDataAvailable: boolean
	}
	title: string
}

const CollectionMovieList: FC<PropsType> = ({
	movieList: { movies, isMoreDataAvailable },
	title,
}) => {
	const [lastMovieId, setLastMovieId] = useState<string | undefined>(
		undefined
	)
	const [moviesToShow, setMoviesToShow] = useState<Array<IMovieCard>>([
		...movies,
	])
	const [isShowMoreButton, setIsShowMoreButton] =
		useState<boolean>(isMoreDataAvailable)
	const { currentUser } = useAuth()

	const getMoreCollectionMovies = async () => {
		const result = await getCollectionItemsList(
			currentUser?.uid,
			'movies',
			20,
			lastMovieId
		)
		result.items.map(item => {
			setMoviesToShow(prevState => [...prevState, item])
		})
		setIsShowMoreButton(result.isMoreDataAvailable)
	}

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
