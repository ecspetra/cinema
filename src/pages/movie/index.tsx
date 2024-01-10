import {
	URL_TO_SEARCH,
	URL_TO_SEARCH_LIST_ITEMS,
} from '@/constants/linksToFetch'
import { useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import TopBanner from '@/components/TopBanner'
import { MOVIE_LIST_TOP_BANNER_IMAGE } from '@/constants/images'
import Filter from '@/app/components/Filter'
import ItemsListWrap from '@/components/List/ItemsListWrap'
import Search from '@/app/components/UI/Search'
import Title from '@/app/components/UI/Title/Title'
import { UserCollections } from '@/constants/enum'
import ErrorScreen from '@/app/components/UI/Error/ErrorScreen'
import { IFetchedResult, IItemCard } from '../../../interfaces'
import useGeneralListPageFetch from '@/hooks/useGeneralListPageFetch'

const GeneralMovieListPage = ({
	movieListFromProps,
}: {
	movieListFromProps: IFetchedResult<IItemCard>
}) => {
	const defaultUrlToFetch = URL_TO_SEARCH_LIST_ITEMS.replace(
		'{type}',
		UserCollections.movie
	)
	const defaultUrlToSearch = URL_TO_SEARCH.replace(
		'{fieldName}',
		UserCollections.movie
	)

	const [urlToFetch, setUrlToFetch] = useState<string>(defaultUrlToFetch)
	const isDefaultListPresented = urlToFetch.includes(defaultUrlToFetch)

	const { items, isLoading } = useGeneralListPageFetch(
		movieListFromProps,
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
			<TopBanner imageSrc={MOVIE_LIST_TOP_BANNER_IMAGE} />
			<Title className='text-3xl md:text-7xl after:hidden pb-0'>
				Movies
			</Title>
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
				onApplyFilter={setUrlToFetch}
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
				itemsList={items.items}
				collectionType={UserCollections.movie}
				isMoreDataAvailable={items.isMoreDataAvailable}
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
			URL_TO_SEARCH_LIST_ITEMS.replace('{type}', UserCollections.movie),
			1
		)

		return {
			props: {
				movieListFromProps: defaultMovies,
			},
		}
	} catch (error) {
		return {
			props: {
				movieListFromProps: null,
			},
		}
	}
}

export default GeneralMovieListPage
