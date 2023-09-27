import MovieCard from '../../MovieCard'
import { IMovieCard } from '../../../../../interfaces'
import { FC, useEffect, useState } from 'react'
import Button from '@/app/components/UI/Button'
import { getCollectionMovies } from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'

type PropsType = {
	movieList: {
		movies: Array<IMovieCard>
		isMoreMoviesAvailable: boolean
	}
}

const CollectionMoviesList: FC<PropsType> = ({
	movieList: { movies, isMoreMoviesAvailable },
}) => {
	const [lastMovieId, setLastMovieId] = useState<number | undefined>(
		undefined
	)
	const [fetchedMovies, setFetchedMovies] = useState<Array<IMovieCard>>([])
	const [moviesToShow, setMoviesToShow] = useState([])
	const [isShowMoreButton, setIsShowMoreButton] = useState<boolean>(
		isMoreMoviesAvailable
	)
	const { currentUser } = useAuth()

	const getMoreCollectionMovies = async () => {
		const result = await getCollectionMovies(currentUser?.uid, lastMovieId)
		setFetchedMovies(result.movies)
		setIsShowMoreButton(result.isMoreMoviesAvailable)
	}

	useEffect(() => {
		setFetchedMovies([...movies])
	}, [])

	useEffect(() => {
		if (fetchedMovies.length !== 0) {
			fetchedMovies.map(item => {
				setMoviesToShow(prevState => [...prevState, item])
			})
			setFetchedMovies([])
		}
	}, [fetchedMovies])

	useEffect(() => {
		if (lastMovieId) getMoreCollectionMovies()
	}, [lastMovieId])

	return (
		<div className='mb-16'>
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
