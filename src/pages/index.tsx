import {
	LINK_TO_FETCH_DEFAULT_MOVIE_LIST,
	LINK_TO_FETCH_UPCOMING_MOVIE_LIST,
} from '@/constants/linksToFetch'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import HomePageSlider from '@/components/HomePageSlider'
import ItemsListWrap from '@/components/List/ItemsListWrap'

const Home = ({ results }) => {
	const [defaultMovieList, setDefaultMovieList] = useState(null)
	const [upcomingMovieList, setUpcomingMovieList] = useState(null)

	useEffect(() => {
		if (!results) {
			getResultsByPage(LINK_TO_FETCH_DEFAULT_MOVIE_LIST, 1).then(data => {
				setDefaultMovieList(data)
			})
			getResultsByPage(LINK_TO_FETCH_UPCOMING_MOVIE_LIST, 1).then(
				data => {
					setUpcomingMovieList(data)
				}
			)
		}
	}, [])

	useEffect(() => {
		setDefaultMovieList(results.defaultMovies)
		setUpcomingMovieList(results.upcomingMovies)
	}, [results])

	if (!defaultMovieList || !upcomingMovieList) return <Loader />

	return (
		<>
			<HomePageSlider movies={upcomingMovieList} />
			<ItemsListWrap
				itemsList={defaultMovieList.items}
				listName='movie'
				title='Discover movies'
				isMoreDataAvailable={defaultMovieList.isMoreDataAvailable}
				linkToFetchItems={LINK_TO_FETCH_DEFAULT_MOVIE_LIST}
			/>
		</>
	)
}

export const getServerSideProps = async () => {
	try {
		const defaultMovies = await getResultsByPage(
			LINK_TO_FETCH_DEFAULT_MOVIE_LIST,
			1
		)

		const upcomingMovies = await getResultsByPage(
			LINK_TO_FETCH_UPCOMING_MOVIE_LIST,
			1
		)

		return {
			props: {
				results: {
					defaultMovies,
					upcomingMovies,
				},
			},
		}
	} catch (error) {
		return {
			props: {
				results: null,
			},
		}
	}
}

export default Home
