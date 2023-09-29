import MovieCard from '../../MovieCard'
import { IMovieCard } from '../../../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
import Button from '@/app/components/UI/Button'
import { getCollectionMovies } from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import Title from '@/app/components/UI/Title/Title'

type PropsType = {
	movieList: {
		movies: Array<IMovieCard>
		isMoreMoviesAvailable: boolean
	}
	title: string
}

const CollectionMoviesList: FC<PropsType> = ({
	movieList: { movies, isMoreMoviesAvailable },
	title,
}) => {
	const [lastMovieId, setLastMovieId] = useState<string | undefined>(
		undefined
	)
	const [moviesToShow, setMoviesToShow] = useState<Array<IMovieCard>>([
		...movies,
	])
	const [isShowMoreButton, setIsShowMoreButton] = useState<boolean>(
		isMoreMoviesAvailable
	)
	const { currentUser } = useAuth()

	const getMoreCollectionMovies = async () => {
		const result = await getCollectionMovies(currentUser?.uid, lastMovieId)
		result.movies.map(item => {
			setMoviesToShow(prevState => [...prevState, item])
		})
		setIsShowMoreButton(result.isMoreMoviesAvailable)
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

export default CollectionMoviesList
