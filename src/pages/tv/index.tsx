import {
	URL_TO_SEARCH,
	URL_TO_SEARCH_LIST_ITEMS,
} from '@/constants/linksToFetch'
import { useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import TopBanner from '@/components/TopBanner'
import { TV_LIST_TOP_BANNER_IMAGE } from '@/constants/images'
import ItemsListWrap from '@/components/List/ItemsListWrap'
import Search from '@/app/components/UI/Search'
import Filter from '@/app/components/Filter'
import Title from '@/app/components/UI/Title/Title'
import { UserCollections } from '@/constants/enum'
import { IFetchedResult, IItemCard } from '../../../interfaces'
import useGeneralListPageFetch from '@/hooks/useGeneralListPageFetch'
import ErrorScreen from '@/app/components/UI/Error/ErrorScreen'

const GeneralTVShowListPage = ({
	tvShowListFromProps,
}: {
	tvShowListFromProps: IFetchedResult<IItemCard>
}) => {
	const defaultUrlToFetch = URL_TO_SEARCH_LIST_ITEMS.replace(
		'{type}',
		UserCollections.tv
	)
	const defaultUrlToSearch = URL_TO_SEARCH.replace(
		'{fieldName}',
		UserCollections.tv
	)

	const [urlToFetch, setUrlToFetch] = useState<string>(defaultUrlToFetch)
	const isDefaultListPresented = urlToFetch.includes(defaultUrlToFetch)

	const { items, isLoading } = useGeneralListPageFetch(
		tvShowListFromProps,
		urlToFetch
	)

	if (!items) {
		return isLoading ? (
			<Loader className='bg-transparent' />
		) : (
			<ErrorScreen title='Something went wrong' text='No data found' />
		)
	}

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
				isSearchApplied={!isDefaultListPresented}
				isSearchFieldWrapped
			/>
			<Filter
				collectionType={UserCollections.tv}
				onApplyFilter={setUrlToFetch}
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
				itemsList={items.items}
				collectionType={UserCollections.tv}
				isMoreDataAvailable={items.isMoreDataAvailable}
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
			URL_TO_SEARCH_LIST_ITEMS.replace('{type}', UserCollections.tv),
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

export default GeneralTVShowListPage
