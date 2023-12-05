import {
	URL_TO_FETCH_UPCOMING_MOVIE_LIST,
	URL_TO_SEARCH,
	URL_TO_SEARCH_LIST_ITEMS,
} from '@/constants/linksToFetch'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import HomePageSlider from '@/components/HomePageSlider'
import ItemsListWrap from '@/components/List/ItemsListWrap'
import Search from '@/app/components/UI/Search'

const Home = ({ results }) => {
	const defaultUrlToSearch = URL_TO_SEARCH.replace('{fieldName}', 'multi')
	const defaultUrlToFetch = URL_TO_SEARCH_LIST_ITEMS.replace(
		'{type}',
		'movie'
	)
	const [defaultMovieList, setDefaultMovieList] = useState(null)
	const [upcomingMovieList, setUpcomingMovieList] = useState(null)
	const [urlToFetch, setUrlToFetch] = useState(defaultUrlToFetch)
	const searchQuery = new URL(urlToFetch).searchParams.get('query')
	const listTitle = urlToFetch.includes(defaultUrlToFetch)
		? 'Popular movies'
		: `Search results for '${searchQuery}'`

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
			<Search
				type='movie'
				name='defaultSearch'
				label='Search'
				urlToFetch={defaultUrlToSearch}
				onSearch={setUrlToFetch}
				className='!p-0'
				isWrapped
			/>
			<ItemsListWrap
				itemsList={defaultMovieList.items}
				type='general'
				isMoreDataAvailable={defaultMovieList.isMoreDataAvailable}
				urlToFetchItems={urlToFetch}
				title={listTitle}
				isFilterable
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
