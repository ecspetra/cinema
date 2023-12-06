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
import Title from '@/app/components/UI/Title/Title'

const Home = ({ results }) => {
	const defaultUrlToSearch = URL_TO_SEARCH.replace('{fieldName}', 'multi')
	const defaultUrlToFetch = URL_TO_SEARCH_LIST_ITEMS.replace(
		'{type}',
		'movie'
	)
	const [itemsList, setItemsList] = useState(null)
	const [upcomingMovieList, setUpcomingMovieList] = useState(null)
	const [urlToFetch, setUrlToFetch] = useState(defaultUrlToFetch)
	const searchQuery = new URL(urlToFetch).searchParams.get('query')
	const isDefaultList = urlToFetch.includes(defaultUrlToFetch)
	const listTitle = isDefaultList
		? 'Popular movies'
		: `Search results for '${searchQuery}'`
	const listType = isDefaultList ? 'movie' : 'general'

	useEffect(() => {
		if (!results) {
			getResultsByPage(
				URL_TO_SEARCH_LIST_ITEMS.replace('{type}', 'movie'),
				1
			).then(data => {
				setItemsList(data)
			})
			getResultsByPage(URL_TO_FETCH_UPCOMING_MOVIE_LIST, 1).then(data => {
				setUpcomingMovieList(data)
			})
		}
	}, [])

	useEffect(() => {
		setItemsList(results.defaultMovies)
		setUpcomingMovieList(results.upcomingMovies)
	}, [results])

	if (!itemsList || !upcomingMovieList) return <Loader />

	return (
		<>
			<HomePageSlider movies={upcomingMovieList} />
			<Title>{listTitle}</Title>
			<Search
				type='movie'
				name='defaultSearch'
				label='Search for movie, TV show or person'
				urlToFetch={defaultUrlToSearch}
				defaultUrlToFetch={defaultUrlToFetch}
				onSearch={setUrlToFetch}
				isWrapped
				isApplied={!isDefaultList}
			/>
			<p>
				Fix genres in profile, Fix search results in search select for
				multi search, Fix collection button for Search Card
			</p>
			<ItemsListWrap
				itemsList={itemsList.items}
				type={listType}
				isMoreDataAvailable={itemsList.isMoreDataAvailable}
				urlToFetchItems={urlToFetch}
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
