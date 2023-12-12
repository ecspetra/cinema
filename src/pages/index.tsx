import { useEffect, useState } from 'react'
import {
	URL_TO_FETCH_UPCOMING_MOVIE_LIST,
	URL_TO_SEARCH,
	URL_TO_SEARCH_LIST_ITEMS,
} from '@/constants/linksToFetch'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import HomePageSlider from '@/components/HomePageSlider'
import ItemsListWrap from '@/components/List/ItemsListWrap'
import Search from '@/app/components/UI/Search'
import Title from '@/app/components/UI/Title/Title'
import { IItemCard, IUpcomingMovieItem } from '../../interfaces'
import { showErrorNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'

interface Results {
	defaultMovies: { items: IItemCard[]; isMoreDataAvailable: boolean } | null
	upcomingMovies: {
		items: IUpcomingMovieItem[]
		isMoreDataAvailable: boolean
	} | null
}

const Home = ({ results }: { results: Results }) => {
	const { showModal } = useModal()
	const defaultUrlToSearch = URL_TO_SEARCH.replace('{fieldName}', 'multi')
	const defaultUrlToFetch = URL_TO_SEARCH_LIST_ITEMS.replace(
		'{type}',
		'movie'
	)
	const [defaultMovieList, setDefaultMovieList] =
		useState<Results['defaultMovies']>(null)
	const [upcomingMovieList, setUpcomingMovieList] =
		useState<Results['upcomingMovies']>(null)
	const [urlToFetch, setUrlToFetch] = useState<string>(defaultUrlToFetch)
	const searchQuery = new URL(urlToFetch).searchParams.get('query')
	const isDefaultList = urlToFetch.includes(defaultUrlToFetch)
	const listTitle = isDefaultList
		? 'Popular movies'
		: `Search results for '${searchQuery}'`
	const collectionType = isDefaultList ? 'movie' : 'basic'

	useEffect(() => {
		if (results) {
			setDefaultMovieList(results.defaultMovies)
			setUpcomingMovieList(results.upcomingMovies)
		} else {
			try {
				getResultsByPage(
					URL_TO_SEARCH_LIST_ITEMS.replace('{type}', 'movie'),
					1
				).then(data => {
					setDefaultMovieList(data)
				})
				getResultsByPage(URL_TO_FETCH_UPCOMING_MOVIE_LIST, 1).then(
					data => {
						setUpcomingMovieList(data)
					}
				)
			} catch (error) {
				showErrorNotification(showModal, 'An error has occurred')
			}
		}
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

// export const getServerSideProps = async () => {
// 	try {
// 		const defaultMovies = await getResultsByPage(
// 			URL_TO_SEARCH_LIST_ITEMS.replace('{type}', 'movie'),
// 			1
// 		)
//
// 		const upcomingMovies = await getResultsByPage(
// 			URL_TO_FETCH_UPCOMING_MOVIE_LIST,
// 			1
// 		)
//
// 		return {
// 			props: {
// 				results: {
// 					defaultMovies,
// 					upcomingMovies,
// 				},
// 			},
// 		}
// 	} catch (error) {
// 		return {
// 			props: {
// 				results: null,
// 			},
// 		}
// 	}
// }

export default Home
