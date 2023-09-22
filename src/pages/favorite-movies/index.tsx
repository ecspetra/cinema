import MoviesListDefault from '../../components/Movie/MoviesList/MoviesListDefault'
import { NextPageContext } from 'next'
import { LINK_TO_FETCH_DEFAULT_MOVIES_FIRST_PAGE } from '@/constants/links'
import { useEffect, useState } from 'react'
import Title from '@/app/components/UI/Title/Title'

const FavoriteMovies = ({ moviesFromProps }) => {
	const [favoriteMovies, setFavoriteMovies] = useState(moviesFromProps)

	useEffect(() => {
		const fetchHomePageMovies = async () => {
			try {
				const response = await fetch(
					LINK_TO_FETCH_DEFAULT_MOVIES_FIRST_PAGE
				)
				const result = await response.json()
				setFavoriteMovies(result.results)
			} catch (error) {
				setFavoriteMovies([])
			}
		}

		if (!moviesFromProps) fetchHomePageMovies()
	}, [])

	if (!favoriteMovies.length) return <div>Loading</div>

	return (
		<>
			<Title className='text-7xl'>Favorite movies</Title>
			<MoviesListDefault moviesFromProps={favoriteMovies} />
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	try {
		const response = await fetch(LINK_TO_FETCH_DEFAULT_MOVIES_FIRST_PAGE)
		const result = await response.json()
		return {
			props: {
				moviesFromProps: result.results,
			},
		}
	} catch (error) {
		return {
			props: {
				moviesFromProps: [],
			},
		}
	}
}

export default FavoriteMovies
