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
import Title from '@/app/components/UI/Title/Title'
import { UserCollections } from '@/constants/enum'

const TVShows = ({ results }) => {
	const defaultUrlToFetch = URL_TO_SEARCH_LIST_ITEMS.replace('{type}', 'tv')
	const defaultUrlToSearch = URL_TO_SEARCH.replace('{fieldName}', 'tv')
	const [defaultTvShowsList, setDefaultTvShowsList] = useState(null)
	const [urlToFetch, setUrlToFetch] = useState(defaultUrlToFetch)
	const isDefaultList = urlToFetch.includes(defaultUrlToFetch)

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
			<Title className='text-7xl after:hidden pb-0'>TV shows</Title>
			<Search
				collectionType={UserCollections.tv}
				name='tvShowsSearch'
				label='Search TV shows'
				urlToFetch={defaultUrlToSearch}
				defaultUrlToFetch={defaultUrlToFetch}
				onSearch={setUrlToFetch}
				isApplied={!isDefaultList}
				isWrapped
			/>
			<Filter
				collectionType={UserCollections.tv}
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
				collectionType={UserCollections.tv}
				isMoreDataAvailable={defaultTvShowsList.isMoreDataAvailable}
				urlToFetchItems={urlToFetch}
				isSortable
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
