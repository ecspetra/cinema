import { getResultsByPage } from '@/handlers/getResultsByPage'
import {
	URL_TO_FETCH_UPCOMING_MOVIE_LIST,
	URL_TO_SEARCH_LIST_ITEMS,
} from '@/constants/linksToFetch'
import { IItemCard, IUpcomingMovieItem } from '../../interfaces'
import { UserCollections } from '@/constants/enum'

interface HomePageData {
	defaultMoviesData: { items: IItemCard[]; isMoreDataAvailable: boolean }
	upcomingMoviesData: {
		items: IUpcomingMovieItem[]
		isMoreDataAvailable: boolean
	}
}

export const getHomePageData = async (): Promise<HomePageData> => {
	try {
		const defaultMoviesData = await getResultsByPage(
			URL_TO_SEARCH_LIST_ITEMS.replace('{type}', UserCollections.movie),
			1
		)
		const upcomingMoviesData = await getResultsByPage(
			URL_TO_FETCH_UPCOMING_MOVIE_LIST,
			1
		)
		return { defaultMoviesData, upcomingMoviesData }
	} catch (error) {
		throw error
	}
}
