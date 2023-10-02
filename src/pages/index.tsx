import MovieList from '../components/Movie/MovieList'
import { NextPageContext } from 'next'
import { LINK_TO_FETCH_DEFAULT_MOVIE_LIST } from '@/constants/linksToFetch'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'

const Home = ({ results, isMoreDataAvailable }) => {
	const [homePageMovies, setHomePageMovies] = useState(results)
	const [isNextResult, setIsNextResult] = useState(isMoreDataAvailable)

	useEffect(() => {
		if (!results) {
			getResultsByPage(LINK_TO_FETCH_DEFAULT_MOVIE_LIST, 1).then(data => {
				setHomePageMovies(data.results)
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
				results: movies.results,
				isMoreDataAvailable: !!movies.isMoreDataAvailable,
			},
		}
	} catch (error) {
		return {
			props: {
				results: [],
				isMoreDataAvailable: false,
			},
		}
	}
}

export default Home
