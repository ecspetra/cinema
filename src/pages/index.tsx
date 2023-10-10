import MovieList from '../components/Movie/MovieList'
import { NextPageContext } from 'next'
import { LINK_TO_FETCH_DEFAULT_MOVIE_LIST } from '@/constants/linksToFetch'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'

const Home = ({ items, isMoreDataAvailable }) => {
	const [homePageMovies, setHomePageMovies] = useState(items)
	const [isNextResult, setIsNextResult] = useState(isMoreDataAvailable)

	useEffect(() => {
		if (!items) {
			getResultsByPage(LINK_TO_FETCH_DEFAULT_MOVIE_LIST, 1).then(data => {
				setHomePageMovies(data.items)
				setIsNextResult(!!data.isMoreDataAvailable)
			})
		}
	}, [])

	if (!homePageMovies) return <Loader />

	return (
		<MovieList
			movieList={homePageMovies}
			title='Discover movies'
			isMoreDataAvailable={isNextResult}
		/>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	try {
		const movies = await getResultsByPage(
			LINK_TO_FETCH_DEFAULT_MOVIE_LIST,
			1
		)

		return {
			props: {
				items: movies.items,
				isMoreDataAvailable: !!movies.isMoreDataAvailable,
			},
		}
	} catch (error) {
		return {
			props: {
				items: [],
				isMoreDataAvailable: false,
			},
		}
	}
}

export default Home
