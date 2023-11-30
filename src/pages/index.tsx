import {
	URL_TO_FETCH_UPCOMING_MOVIE_LIST,
	URL_TO_SEARCH_LIST_ITEMS,
} from '@/constants/linksToFetch'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import HomePageSlider from '@/components/HomePageSlider'
import ItemsList from '../components/List/ItemsListWrap/ItemsList'
import ItemsListWrap from '@/components/List/ItemsListWrap'

const Home = ({ results }) => {
	const [defaultMovieList, setDefaultMovieList] = useState(null)
	const [upcomingMovieList, setUpcomingMovieList] = useState(null)

	useEffect(() => {
		if (!results) {
			getResultsByPage(
				URL_TO_SEARCH_LIST_ITEMS.replace('{type}', 'movie'),
				1
			).then(data => {
				setDefaultMovieList(data)
			})
			getResultsByPage(URL_TO_FETCH_UPCOMING_MOVIE_LIST, 1).then(data => {
				setUpcomingMovieList(data)
			})
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
				isMoreDataAvailable={defaultMovieList.isMoreDataAvailable}
				urlToFetchItems={URL_TO_SEARCH_LIST_ITEMS.replace(
					'{type}',
					'movie'
				)}
				title='Discover movies'
			/>
		</>
	)
}

export const getServerSideProps = async () => {
	try {
		const defaultMovies = await getResultsByPage(
			URL_TO_SEARCH_LIST_ITEMS.replace('{type}', 'movie'),
			1
		)

		const upcomingMovies = await getResultsByPage(
			URL_TO_FETCH_UPCOMING_MOVIE_LIST,
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
