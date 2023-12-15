import {
	URL_TO_SEARCH,
	URL_TO_SEARCH_LIST_ITEMS,
} from '@/constants/linksToFetch'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import TopBanner from '@/components/TopBanner'
import { MOVIE_LIST_TOP_BANNER_IMAGE } from '@/constants/images'
import Filter from '@/app/components/Filter'
import ItemsListWrap from '@/components/List/ItemsListWrap'
import Search from '@/app/components/UI/Search'
import Title from '@/app/components/UI/Title/Title'
import { UserCollections } from '@/constants/enum'

const GeneralMovieListPage = ({ results }) => {
	const defaultUrlToFetch = URL_TO_SEARCH_LIST_ITEMS.replace(
		'{type}',
		'movie'
	)
	const defaultUrlToSearch = URL_TO_SEARCH.replace('{fieldName}', 'movie')
	const [defaultMovieList, setDefaultMovieList] = useState(null)
	const [urlToFetch, setUrlToFetch] = useState(defaultUrlToFetch)
	const isDefaultListPresented = urlToFetch.includes(defaultUrlToFetch)

	useEffect(() => {
		if (!results) {
			getResultsByPage(urlToFetch, 1).then(data => {
				setDefaultMovieList(data)
			})
		}
	}, [])

	useEffect(() => {
		setDefaultMovieList(results)
	}, [results])

	if (!defaultMovieList) return <Loader />

	return (
		<>
			<TopBanner imageSrc={MOVIE_LIST_TOP_BANNER_IMAGE} />
			<Title className='text-7xl after:hidden pb-0'>Movies</Title>
			<Search
				collectionType={UserCollections.movie}
				name='movieSearch'
				label='Search movie'
				urlToFetch={defaultUrlToSearch}
				defaultUrlToFetch={defaultUrlToFetch}
				onSearch={setUrlToFetch}
				isSearchApplied={!isDefaultListPresented}
				isSearchFieldWrapped
			/>
			<Filter
				collectionType={UserCollections.movie}
				onApply={setUrlToFetch}
				fields={[
					'primary_release_year',
					'vote_average.lte',
					'with_people',
					'with_companies',
					'with_original_language',
					'with_keywords',
					'with_genres',
				]}
				defaultUrl={defaultUrlToFetch}
			/>
			<ItemsListWrap
				itemsList={defaultMovieList.items}
				collectionType={UserCollections.movie}
				isMoreDataAvailable={defaultMovieList.isMoreDataAvailable}
				urlToFetchItems={urlToFetch}
				isFilterable
				isSortable
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

		return {
			props: {
				results: defaultMovies,
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

export default GeneralMovieListPage
