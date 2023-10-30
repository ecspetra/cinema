import { NextPageContext } from 'next'
import {
	LINK_TO_FETCH_DEFAULT_MOVIE_LIST,
	LINK_TO_FETCH_UPCOMING_MOVIE_LIST,
} from '@/constants/linksToFetch'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import ItemsList from '../components/List/ItemsList'
import HomePageSlider from '@/components/HomePageSlider'

const Home = ({ defaultMovies, upcomingMovies }) => {
	const [defaultMovieList, setDefaultMovieList] = useState(null)
	const [upcomingMovieList, setUpcomingMovieList] = useState(null)

	useEffect(() => {
		if (!defaultMovies) {
			getResultsByPage(LINK_TO_FETCH_DEFAULT_MOVIE_LIST, 1).then(data => {
				setDefaultMovieList(data)
			})
		}

		if (!upcomingMovies) {
			getResultsByPage(LINK_TO_FETCH_UPCOMING_MOVIE_LIST, 1).then(
				data => {
					setUpcomingMovieList(data)
				}
			)
		}
	}, [])

	useEffect(() => {
		setDefaultMovieList(defaultMovies)
		setUpcomingMovieList(upcomingMovies)
	}, [defaultMovies, upcomingMovies])

	if (!defaultMovieList || !upcomingMovieList) return <Loader />

	return (
		<>
			<HomePageSlider movies={upcomingMovieList} />
			<ItemsList
				itemsList={defaultMovieList.items}
				listName='movies'
				title='Discover movies'
				isMoreDataAvailable={defaultMovieList.isMoreDataAvailable}
				linkToFetchItems={LINK_TO_FETCH_DEFAULT_MOVIE_LIST}
			/>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	try {
		const defaultMovieList = await getResultsByPage(
			LINK_TO_FETCH_DEFAULT_MOVIE_LIST,
			1
		)

		const upcomingMovieList = await getResultsByPage(
			LINK_TO_FETCH_UPCOMING_MOVIE_LIST,
			1
		)

		return {
			props: {
				defaultMovieList: defaultMovieList,
				upcomingMovieList: upcomingMovieList,
			},
		}
	} catch (error) {
		return {
			props: {
				defaultMovieList: null,
				upcomingMovieList: null,
			},
		}
	}
}

export default Home
