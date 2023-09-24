import MovieCard from '../../MovieCard'
import { IMovieCard } from '../../../../../interfaces'
import { FC, useEffect, useState } from 'react'
import { LINK_TO_FETCH_DEFAULT_MOVIES } from '@/constants/links'
import { getMovieGenres } from '@/handlers/getMovieGenres'
import Button from '@/app/components/UI/Button'

type PropsType = {
	moviesFromProps: Array<IMovieCard>
	linkToFetchMovies?: string
}

const MoviesListDefault: FC<PropsType> = ({
	moviesFromProps,
	linkToFetchMovies = LINK_TO_FETCH_DEFAULT_MOVIES,
}) => {
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [fetchedMovies, setFetchedMovies] = useState<Array<IMovieCard>>([])
	const [moviesToShow, setMoviesToShow] = useState([])

	const getMoreDefaultMovies = async () => {
		const response = await fetch(linkToFetchMovies + currentPage)
		const result = await response.json()
		setFetchedMovies(prevState => [...prevState, ...result.results])
	}

	useEffect(() => {
		setFetchedMovies([...moviesFromProps])
	}, [])

	useEffect(() => {
		if (fetchedMovies.length !== 0) {
			fetchedMovies.map(item => {
				getMovieGenres(item).then(movie => {
					setMoviesToShow(prevState => [...prevState, movie])
				})
			})
			setFetchedMovies([])
		}
	}, [fetchedMovies])

	useEffect(() => {
		if (currentPage > 1) getMoreDefaultMovies()
	}, [currentPage])

	return (
		<div className='mb-16'>
			<div className='grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center'>
				{moviesToShow.map((item: IMovieCard) => {
					return <MovieCard key={item.id} movie={item} />
				})}
			</div>
			<Button
				className='mx-auto'
				context='empty'
				onClick={() => setCurrentPage(prevState => prevState + 1)}
			>
				Show more
			</Button>
		</div>
	)
}

export default MoviesListDefault
