import { useEffect, useState } from 'react'
import {
	URL_TO_SEARCH,
	URL_TO_SEARCH_LIST_ITEMS,
} from '@/constants/linksToFetch'
import Loader from '@/components/Loader'
import HomePageSlider from '@/components/HomePageSlider'
import ItemsListWrap from '@/components/List/ItemsListWrap'
import Search from '@/app/components/UI/Search'
import Title from '@/app/components/UI/Title/Title'
import { IFetchedResult, IItemCard, IUpcomingMovieItem } from '../../interfaces'
import { showErrorNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import { UserCollections } from '@/constants/enum'
import { getHomePageData } from '@/handlers/getHomePageData'

interface IResults {
	defaultMovies: IFetchedResult<IItemCard> | null
	upcomingMovies: IFetchedResult<IUpcomingMovieItem> | null
}

const Home = ({ results }: { results: IResults }) => {
	const { showModal } = useModal()
	const defaultUrlToSearch = URL_TO_SEARCH.replace('{fieldName}', 'multi')
	const defaultUrlToFetch = URL_TO_SEARCH_LIST_ITEMS.replace(
		'{type}',
		'movie'
	)
	const [defaultMovieList, setDefaultMovieList] =
		useState<IResults['defaultMovies']>(null)
	const [upcomingMovieList, setUpcomingMovieList] =
		useState<IResults['upcomingMovies']>(null)
	const [urlToFetch, setUrlToFetch] = useState<string>(defaultUrlToFetch)
	const searchQuery = new URL(urlToFetch).searchParams.get('query')
	const isDefaultList = urlToFetch.includes(defaultUrlToFetch)
	const listTitle = isDefaultList
		? 'Popular movies'
		: `Search results for '${searchQuery}'`
	const collectionType = isDefaultList
		? UserCollections.movie
		: UserCollections.basic

	useEffect(() => {
		if (results) {
			setDefaultMovieList(results.defaultMovies)
			setUpcomingMovieList(results.upcomingMovies)
		} else
			getHomePageData()
				.then(data => {
					setDefaultMovieList(data.defaultMoviesData)
					setUpcomingMovieList(data.upcomingMoviesData)
				})
				.catch(() => {
					showErrorNotification(showModal, 'An error has occurred')
					setDefaultMovieList({
						items: [],
						isMoreDataAvailable: false,
					})
					setUpcomingMovieList({
						items: [],
						isMoreDataAvailable: false,
					})
				})
	}, [results])

	if (!defaultMovieList || !upcomingMovieList) return <Loader />

	return (
		<>
			<HomePageSlider itemsList={upcomingMovieList} />
			<Title>{listTitle}</Title>
			<Search
				collectionType='movie'
				name='defaultSearch'
				label='Search for movie, TV show or person'
				urlToFetch={defaultUrlToSearch}
				defaultUrlToFetch={defaultUrlToFetch}
				onSearch={setUrlToFetch}
				isWrapped
				isApplied={!isDefaultList}
			/>
			<ItemsListWrap
				itemsList={defaultMovieList.items}
				collectionType={collectionType}
				isMoreDataAvailable={defaultMovieList.isMoreDataAvailable}
				urlToFetchItems={urlToFetch}
				isFilterable
			/>
		</>
	)
}

export const getServerSideProps = async () => {
	return getHomePageData()
		.then(data => {
			return {
				props: {
					results: {
						defaultMovies: data.defaultMoviesData,
						upcomingMovies: data.upcomingMoviesData,
					},
				},
			}
		})
		.catch(() => {
			return {
				props: {
					results: null,
				},
			}
		})
}

export default Home
