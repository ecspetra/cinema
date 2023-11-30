import {
	URL_TO_SEARCH,
	URL_TO_SEARCH_LIST_ITEMS,
} from '@/constants/linksToFetch'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import TopBanner from '@/components/TopBanner'
import { TV_LIST_TOP_BANNER_IMAGE } from '@/constants/images'
import ItemsListWrap from '@/components/List/ItemsListWrap'
import Search from '@/app/components/UI/Search'
import Filter from '@/app/components/Filter'

const TVShows = ({ results }) => {
	const defaultUrlToFetch = URL_TO_SEARCH_LIST_ITEMS.replace('{type}', 'tv')
	const defaultUrlToSearch = URL_TO_SEARCH.replace('{fieldName}', 'tv')
	const [defaultTvShowsList, setDefaultTvShowsList] = useState(null)
	const [urlToFetch, setUrlToFetch] = useState(defaultUrlToFetch)

	useEffect(() => {
		if (!results) {
			getResultsByPage(urlToFetch, 1).then(data => {
				setDefaultTvShowsList(data)
			})
		}
	}, [])

	useEffect(() => {
		setDefaultTvShowsList(results)
	}, [results])

	if (!defaultTvShowsList) return <Loader />

	return (
		<>
			<TopBanner imageSrc={TV_LIST_TOP_BANNER_IMAGE} />
			<Search
				type='tv'
				name='tvShowsSearch'
				label='Search TV Shows'
				urlToFetch={defaultUrlToSearch}
				onSearch={setUrlToFetch}
				isWrapped
			/>
			<Filter
				type='tv'
				onApply={setUrlToFetch}
				fields={[
					'first_air_date_year',
					'vote_average.lte',
					'with_companies',
					'with_original_language',
					'with_keywords',
					'with_genres',
				]}
				defaultUrl={defaultUrlToFetch}
			/>
			<ItemsListWrap
				itemsList={defaultTvShowsList.items}
				listName='tv'
				isMoreDataAvailable={defaultTvShowsList.isMoreDataAvailable}
				urlToFetchItems={urlToFetch}
				title='TV shows'
				isFilterable
			/>
		</>
	)
}

export const getServerSideProps = async () => {
	try {
		const defaultTvShows = await getResultsByPage(
			URL_TO_SEARCH_LIST_ITEMS.replace('{type}', 'tv'),
			1
		)

		return {
			props: {
				results: defaultTvShows,
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

export default TVShows
