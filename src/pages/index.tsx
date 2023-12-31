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

interface IHomePageProps {
	defaultMovies: IFetchedResult<IItemCard> | null
	upcomingMovies: IFetchedResult<IUpcomingMovieItem> | null
}

const HomePage = ({ homePageProps }: { homePageProps: IHomePageProps }) => {
	const { showModal } = useModal()
	const defaultUrlToSearchItems = URL_TO_SEARCH.replace(
		'{fieldName}',
		'multi'
	)
	const defaultUrlToFetchItems = URL_TO_SEARCH_LIST_ITEMS.replace(
		'{type}',
		UserCollections.movie
	)
	const [defaultMovieList, setDefaultMovieList] =
		useState<IHomePageProps['defaultMovies']>(null)
	const [upcomingMovieList, setUpcomingMovieList] =
		useState<IHomePageProps['upcomingMovies']>(null)
	const [urlToFetch, setUrlToFetch] = useState<string>(defaultUrlToFetchItems)
	const searchQuery = new URL(urlToFetch).searchParams.get('query')
	const isDefaultListPresented = urlToFetch.includes(defaultUrlToFetchItems)
	const listTitle = isDefaultListPresented
		? 'Popular movies'
		: `Search results for '${searchQuery}'`
	const collectionType = isDefaultListPresented
		? UserCollections.movie
		: UserCollections.basic

	useEffect(() => {
		if (homePageProps) {
			setDefaultMovieList(homePageProps.defaultMovies)
			setUpcomingMovieList(homePageProps.upcomingMovies)
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
	}, [homePageProps])

	if (!defaultMovieList || !upcomingMovieList)
		return <Loader className='bg-transparent' />

	return (
		<>
			<HomePageSlider itemsList={upcomingMovieList} />
			<Title>{listTitle}</Title>
			<Search
				collectionType={UserCollections.movie}
				name='defaultSearch'
				label='Search for movie, TV show or person'
				urlToFetch={defaultUrlToSearchItems}
				defaultUrlToFetch={defaultUrlToFetchItems}
				onSearch={setUrlToFetch}
				isSearchFieldWrapped
				isSearchApplied={!isDefaultListPresented}
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
					homePageProps: {
						defaultMovies: data.defaultMoviesData,
						upcomingMovies: data.upcomingMoviesData,
					},
				},
			}
		})
		.catch(() => {
			return {
				props: {
					homePageProps: null,
				},
			}
		})
}

export default HomePage
